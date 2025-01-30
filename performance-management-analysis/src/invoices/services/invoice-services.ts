const db = require('../../models');
const { Factura, DetalleFactura, Producto } = db;
import { InvoiceLog } from '../../logging/logModels';
import logger from '../../logging/logger';

const calcularMonto = async (producto: any, cantidad: number, montoAcumulado: number): Promise<number> => {
    const precioUnitario = producto.PrecioUnitario || 0;
    const totalProducto = precioUnitario * cantidad;
    return montoAcumulado + totalProducto;
}

const crearFactura = async (cliente: any, productCart: any, montoTotal: number) => {
    const t = await db.sequelize.transaction();
    try{
        const nuevaFactura = await Factura.create(
          {
            FechaVenta: new Date(),
            IdCliente: cliente.IdCliente,
            TotalVenta: Number(montoTotal).toFixed(2)
          }, 
          { transaction: t }
        );

        // Almacenamos las promesas de productos
        const productosPromise = productCart.map(async (item: any) => {
            const { producto, cantidad } = item;
            const montoProducto = await calcularMonto(producto, cantidad, 0);
            producto.Existencia -= cantidad;
            return {
                producto, // Guardamos el producto que se actualizará
                montoProducto,
                cantidad
            };
        });

        // Esperamos a que todas las promesas de productos se resuelvan
        const productosActualizados = await Promise.all(productosPromise);

        // Creamos los detalles de la factura
        const detallesFactura = productosActualizados.map(({ producto, cantidad, montoProducto }) => {
            return {
                IdVenta: nuevaFactura.IdVenta,
                IdProducto: producto.IdProducto,
                Cantidad: cantidad,
                TotalProducto: Number(montoProducto).toFixed(2)
            };
        });

        // Creamos los detalles en la base de datos
        await DetalleFactura.bulkCreate(detallesFactura, { transaction: t });

        // Guardamos todos los productos en paralelo
        const savePromises = productosActualizados.map(async ({ producto }) => {
            try {
                const productInstance = await Producto.findByPk(producto.IdProducto, { transaction: t });
                productInstance.Existencia = producto.Existencia;
                await productInstance.save({ transaction: t });
            } catch (err) {
                logger(InvoiceLog).error(`Error al guardar el producto ${producto.IdProducto} en la base de datos -- status code: 500`, err);
            }
        });

        // Esperamos a que todos los productos se guarden
        await Promise.all(savePromises);

        if (!t.finished)
            await t.commit();
        logger(InvoiceLog).info(`Cliente: ${cliente.NombreApellido} -- Monto total: ${montoTotal} -- facturaId: ${nuevaFactura.IdVenta} -- status code: 201`);
        return nuevaFactura;
    } 
    catch (error) {
        if (!t.finished)
            await t.rollback(); 
        logger(InvoiceLog).error('Error en la transacción de facturación -- status code: 500', error);
        throw error;
    }
};

export { calcularMonto, crearFactura };
