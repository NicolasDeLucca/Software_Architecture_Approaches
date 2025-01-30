import mongoose from 'mongoose';
import { mongoConfig } from './config';

mongoose.set('strictQuery', true);

async function ConnectToLogger(){
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/audit', mongoConfig).
        then(() => {
            console.log('Succesfully connected to the Logger Service');
        }). 
        catch((error) => {
            console.error('Error connecting to the Logger Service: ', error);
        });
    } 
    catch (err) {
        console.error('Error al conectar, reintentando en 5 segundos...', err);
        setTimeout(ConnectToLogger, 5000); // Reintenta cada 5 segundos
    }
}

ConnectToLogger();

mongoose.connection.on('disconnected', () => {
    console.warn('Desconectado de MongoDB. Reintentando...');
    setTimeout(ConnectToLogger, 5000);
});

export default mongoose;