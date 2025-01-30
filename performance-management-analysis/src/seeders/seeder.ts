import { sequelize } from '../models';
import { faker } from '@faker-js/faker';

export default async function seedDatabaseSQL() {
  try {
    const transaction = await sequelize.transaction();
    try {
      // Generar 4000 clientes
      const generateClientes = () => {
        let clientes = [];
        for (let i = 0; i < 4000; i++) {
          const nombreApellido = faker.person.firstName() + ' ' + faker.person.lastName();
          clientes.push(`(${i + 1}, ${sequelize.escape(nombreApellido)})`);
        }
        return clientes.join(', ');
      };

      // Generar 800 productos
      const generateProductos = () => {
        let productos = [];
        for (let i = 0; i < 800; i++) {
          const descripcion = faker.commerce.productName();
          const precioUnitario = faker.commerce.price();
          const existencia = faker.number.int({ min: 1, max: 200000 });
          productos.push(`(${i + 1}, ${sequelize.escape(descripcion)}, ${precioUnitario}, ${existencia})`);
        }
        return productos.join(', ');
      };

      // Generar 5000 facturas
      const generateFacturas = () => {
        let facturas = [];
        for (let i = 0; i < 5000; i++) {
          const idCliente = faker.number.int({ min: 1, max: 4000 });
          const fechaVenta = faker.date.past().toISOString().slice(0, 19).replace('T', ' ');
          const totalVenta = faker.commerce.price();
          facturas.push(`(${i + 1}, '${fechaVenta}', ${idCliente}, ${totalVenta})`);
        }
        return facturas.join(', ');
      };

      // Generar líneas de detalle de factura por cada factura
      const generateDetalleFacturas = () => {
        let detalleFacturas = [];
      
        for (let i = 0; i < 5000; i++) {
          const cantidadLineas = 5;  // Establecemos que siempre sean 5 líneas por factura
      
          for (let j = 0; j < cantidadLineas; j++) {
            const idVenta = i + 1; // ID único para cada venta
      
            const cantidad = faker.number.int({ min: 1, max: 10 });
            const idProducto = faker.number.int({ min: 1, max: 800 });
            const totalProducto = faker.commerce.price();
      
            detalleFacturas.push(`(${idVenta}, ${cantidad}, ${idProducto}, ${totalProducto})`);
          }
        }
      
        return detalleFacturas.join(', ');
      };

      // Insertar clientes
      await sequelize.query(`
        INSERT INTO Clientes (IdCliente, NombreApellido) VALUES ${generateClientes()};
      `, { transaction });

      // Insertar productos
      await sequelize.query(`
        INSERT INTO Productos (IdProducto, Descripcion, PrecioUnitario, Existencia) VALUES ${generateProductos()};
      `, { transaction });

      // Insertar facturas
      await sequelize.query(`
        INSERT INTO Facturas (IdVenta, FechaVenta, IdCliente, TotalVenta) VALUES ${generateFacturas()};
      `, { transaction });

      // Insertar detalles de factura
      await sequelize.query(`
        INSERT INTO DetalleFacturas (IdVenta, Cantidad, IdProducto, TotalProducto) VALUES ${generateDetalleFacturas()};
      `, { transaction });

      await transaction.commit();
      console.log('Seed completado con éxito.');

    } catch (error) {
      console.error('Error durante el seed, se hará rollback:', error);
      await transaction.rollback();
    }
  } catch (error) {
    console.error('Error conectando a la base de datos:', error);
  }
}
