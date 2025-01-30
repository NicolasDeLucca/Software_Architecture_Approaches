import express from 'express';
import axios from 'axios';
import dotenv from 'dotenv';
import { Op } from 'sequelize';

import { isToday, enoughStock, isCartEmpty } from './services/invoice-filters';
import { calcularMonto } from './services/invoice-services';

const db = require('../models');
const { Cliente, Producto } = db;
import { InvoiceLog, PaymentLog } from '../logging/logModels';
import buffer from './buffer';
import logger from '../logging/logger';

dotenv.config();
const app = express();
const INVOICE_PORT = process.env.INVOICE_PORT || 3001;
const PAYMENT_PORT = process.env.PAYMENT_PORT || 3000;
app.use(express.json());

app.post('/api/facturacion', async (req, res) => {
    const { nombreApellido, fecha, cart } = req.body;
    if (!nombreApellido) {
        logger(InvoiceLog).error('El nombre y apellido del cliente son requeridos -- status code: 400');
        return res.status(400).json({ error: 'El nombre y apellido del cliente son requeridos' });
    }
    const cliente = await Cliente.findOne({ where: { NombreApellido: nombreApellido }, raw: false });
    if (!cliente) {
        logger(InvoiceLog).error(`Cliente ${nombreApellido} no encontrado -- status code: 404`);
        return res.status(404).json({ error: 'Cliente no encontrado' });
    }

    if (!fecha) {
        logger(InvoiceLog).error('La fecha a facturar es requerida -- status code: 400');
        return res.status(400).json({ error: 'La fecha a facturar es requerida' });
    }
    if (!isToday(new Date(fecha))) {
        logger(InvoiceLog).error(`La fecha enviada no corresponde al día de hoy -- status code: 400. Datos de la solicitud: ${JSON.stringify(req.body)}`);
        return res.status(400).json({ error: 'La fecha no corresponde al día de hoy' });
    }

    if (!cart || isCartEmpty(cart)) {
        logger(InvoiceLog).error('El carrito está vacío -- status code: 400');
        return res.status(400).json({ error: 'El carrito está vacío' });
    }
    
    const productIds = cart.map((item: any) => item.idProducto);
    const productos = await Producto.findAll({ where: { IdProducto: { [Op.in]: productIds }}, raw: false });
    
    if (!productos || productos.length === 0) {
        logger(InvoiceLog).error('No se encontraron productos en la base de datos para los IDs proporcionados -- status code: 404.');
        return res.status(404).json({ error: 'Productos no encontrados' });
    }

    let montoTotal=0;
    let productCart: Array<{ producto: any, cantidad: number }> = [];
    for (const item of cart) {
        const { idProducto, cantidad } = item;
        if (!idProducto || !cantidad) {
            logger(InvoiceLog).error('El producto y la cantidad del mismo son datos requeridos -- status code: 400');
            return res.status(400).json({ error: 'El producto y la cantidad del mismo son datos requeridos' });
        } 
        try {
            const producto = productos.find((p:any) => p.IdProducto === item.idProducto);
            if (!producto) {
                logger(InvoiceLog).error(`Producto con id ${idProducto} no encontrado -- status code: 404`);
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            if (!enoughStock(producto, cantidad)) {
                logger(InvoiceLog).error(`No hay suficiente stock para el producto con id ${idProducto} -- status code: 400. Datos de la solicitud: ${JSON.stringify(req.body)}`);
                return res.status(400).json({ error: 'No hay suficiente stock' });
            }  
            montoTotal = await calcularMonto(producto, cantidad, montoTotal);
            productCart.push({producto, cantidad});
        }
        catch (error){
            console.error('Error interno del servidor de facturación');
            logger(InvoiceLog).error('Error interno del servidor de facturación -- status code: 500', error);
            return res.status(500).json({ error: 'Error interno del servidor de facturación' });
        }
    }
    try {
        const montoTotal2Decimales = Number(montoTotal).toFixed(2);
        const response = await axios.post(`http://localhost:${PAYMENT_PORT}/api/pagos`);
        if (response.status !== 200)
            return res.status(response.status).json({ error: 'Error en el servicio de pagos' });

        logger(PaymentLog).info(JSON.stringify(response.data)); 
        if (response.data.status === 'aprobado'){
            await buffer.add(
                { cliente, productCart, montoTotal }, 
                { attempts: 5, backoff: 5000 }
            );
            return res.status(202).json({message: 'Solicitud recibida y encolada', montoTotal: montoTotal2Decimales});
        } 
        else{
            if (response.data.tiempoRespuesta === '> 500 ms'){
                logger(InvoiceLog).info(`Transacción Rechazada: Cliente: ${nombreApellido} -- Monto total: ${montoTotal2Decimales} -- status code: 202`); 
                return res.status(202);
            }else{
                logger(InvoiceLog).error(`Cliente: ${nombreApellido} -- Monto total: ${montoTotal2Decimales} -- status code: 500. Datos de la solicitud: ${JSON.stringify(req.body)}`);
                return res.status(500);  
            }
        }    
    } 
    catch (error) {
        console.error('Error en la facturación');
        logger(InvoiceLog).error('Error en la facturación -- status code: 500', error);
        return res.status(500).json({ error: 'Error en la facturación' });
    }
});

app.listen(INVOICE_PORT, async () => {
    console.log(`Servicio de Facturas corriendo en el puerto ${INVOICE_PORT}`);
    try {
        await db.sequelize.authenticate();
        console.log('Database connected!');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});