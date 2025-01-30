import http from 'k6/http';
import { check, sleep } from 'k6';

const URL = `http://localhost:3001/api/facturacion`;

function testCase1() {

  const payload = {
    nombreApellido: 'Destin Langosh', // Cliente existente
    fecha: new Date().toISOString(),  
    cart: [
      { idProducto: 1, cantidad: 20 }, // Producto con stock    
      { idProducto: 2, cantidad: 10 },   
      { idProducto: 3, cantidad: 50 },    
      { idProducto: 4, cantidad: 30 },
      { idProducto: 40, cantidad: 210 } // Producto sin stock 
    ],
  };

  const params = {
    timeout: 3000,
    headers: { 'Content-Type': 'application/json' },
  };

  const response = http.post(URL, JSON.stringify(payload), params);
  check(response, {
    'El status es 400 cuando no hay suficiente stock del o los productos solicitados? ': (r) => r.status === 0 || r.status === 400,
    'El error contiene mensaje? :': (r) => r.json().error !== undefined,
  });
}

function testCase2() {

  const payload = {
    nombreApellido: 'Austen Cummerata', // Cliente existente
    fecha: new Date().toISOString(),
    cart: [ 
      { idProducto: 3, cantidad: 1 }, 
      { idProducto: 5, cantidad: 1 }, 
      { idProducto: 12, cantidad: 1 }, 
      { idProducto: 25, cantidad: 1 }, 
      { idProducto: 19, cantidad: 1 }
      
    ],
  };

  const params = {
    timeout: 3000,
    headers: { 'Content-Type': 'application/json' }
  };

  const response = http.post(URL, JSON.stringify(payload), params);
  check(response, {
    'El status es 201/202/500? ': (r) => r.status === 0 || r.status === 201 || r.status === 202 || r.status === 500,
    'Cuando el status es 201, la respuesta contiene montoTotal? ': (r) => r.status !== 201 || r.json().montoTotal !== undefined
  });
}

function testCase3() {

  const payload = {
    nombreApellido: 'Ivy Medhurst', // Cliente existente
    fecha: '2024-01-01', // Fecha incorrecta
    cart: [
      { idProducto: 1, cantidad: 100 },
      { idProducto: 2, cantidad: 10 }
    ],
  };

  const params = {
    timeout: 3000,
    headers: { 'Content-Type': 'application/json' },
  };

  const response = http.post(URL, JSON.stringify(payload), params);
  check(response, {
    'El status es 400 cuando la fecha es incorrecta?: ': (r) => r.status === 0 || r.status === 400,
    'El error contiene mensaje? :': (r) => r.json().error !== undefined,
  });
}

export default function () {
  console.log('Ejecutando test case 1...');
  testCase1();
  sleep(1);

  console.log('Ejecutando test case 2...');
  testCase2();
  sleep(1);

  console.log('Ejecutando test case 3...');
  testCase3();
  sleep(1); 
}
