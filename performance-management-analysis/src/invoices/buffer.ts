import Queue from 'bull';
import { crearFactura } from './services/invoice-services'; 
import logger from '../logging/logger';
import { InvoiceLog } from '../logging/logModels';

const invoiceBuffer = new Queue('invoiceBuffer', {
    redis: {
        host: '127.0.0.1', 
        port: 6379    
    }
});    

// worker
invoiceBuffer.process(async (job) => {
    try {
      const { cliente, productCart, montoTotal } = job.data;
      const nuevaFactura = await crearFactura(cliente, productCart, montoTotal);
      logger(InvoiceLog).info(
        `Cliente: ${cliente.NombreApellido} -- Monto total: ${Number(montoTotal).toFixed(2)} -- facturaId: ${nuevaFactura.IdVenta} 
        -- status code: 201`
      );  
    } 
    catch (error) {
        throw error; 
    }
});
  
invoiceBuffer.on('failed', (job, err) => {
    console.error(`La tarea con ID ${job.id} falló:`, err);
});

export default invoiceBuffer;