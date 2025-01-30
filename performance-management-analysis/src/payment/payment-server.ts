import dotenv from 'dotenv';
const express = require('express');
const app = express();

dotenv.config();
const PAYMENT_PORT = process.env.PAYMENT_PORT || 3000;

const getRandomResponseTime = () => {
  const rand = Math.random();
  if (rand < 0.6) return 50;  // 60% de los casos: < 100 ms
  if (rand < 0.8) return 600;  // 20% de los casos: > 500 ms
  return rand < 0.9 ? 50 : 600;  // 10% de los casos: < 100 ms o > 500 ms
};

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

app.post('/api/pagos', async (req, res) => {
  const response = {
    status: Math.random() < 0.9 ? 'aprobado' : 'rechazado',  
    tiempoRespuesta: getRandomResponseTime() < 100 ? '< 100 ms' : '> 500 ms',
  };

  const delayTime = getRandomResponseTime();  
  if (delayTime) await delay(delayTime);

  console.log(`Simulación de pago: `, response);
  res.status(200).json(response); 
});

app.listen(PAYMENT_PORT, () => {
  console.log(`API de pagos corriendo en el puerto ${PAYMENT_PORT}`);
});
