export let options = {
  thresholds: {
    http_req_duration: ['p(90)<800'], // El 90% debe responder en menos de 800ms
  },
  stages: [
    { duration: '5m', target: 10 },
    { duration: '10m', target: 85 }, 
    { duration: '10m', target: 160 },
    { duration: '15m', target: 235 },  
    { duration: '9', target: 0 }, 
  ],
};