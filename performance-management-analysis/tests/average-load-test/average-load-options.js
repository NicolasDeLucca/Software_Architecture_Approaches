export let options = {
  thresholds: {
    http_req_duration: ['p(90)<700', 'p(95)<1000'], // El 90% debe responder en menos de 700ms
  },
  stages: [
    { duration: '5m', target: 10 },
    { duration: '5m', target: 60 },
    { duration: '10m', target: 110 },
    { duration: '10m', target: 160 },
    { duration: '8m', target: 0 }, // detención de la simulación de forma gradual
  ]
};