import mongoose from './mongoose';

const InvoiceLogSchema = new mongoose.Schema(
{
    level: String,
    message: String,
    timestamp: { type: Date, default: new Date() }
}, 
{ 
    collection: 'invoice-logs' 
});

const InvoiceLog = mongoose.model('InvoiceLog', InvoiceLogSchema);

const PaymentLogSchema = new mongoose.Schema(
{
    level: String,
    message: String,
    timestamp: { type: Date, default: new Date() }
}, 
{ 
    collection: 'payment-logs' 
});
    
const PaymentLog = mongoose.model('PaymentLog', PaymentLogSchema);
    
export { InvoiceLog, PaymentLog };