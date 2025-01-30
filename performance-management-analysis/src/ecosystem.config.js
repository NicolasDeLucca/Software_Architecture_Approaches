module.exports = {
    apps: [
    {
        name: 'payment-simulator-api',
        script: 'dist/payment/payment-server.js', 
        instances: 3,
        exec_mode: 'cluster', 
        env: {
          NODE_ENV: 'production',
          PORT: 3000 
        },
    },
    {
        name: 'invoice-api',
        script: 'dist/invoices/invoice-server.js', 
        instances: 7, 
        exec_mode: 'cluster', 
        env: {
          NODE_ENV: 'production',
          MONGO_URI: 'mongodb://127.0.0.1:27017/audit',
          PORT: 3001,
          REDIS_HOST: '127.0.0.1', 
          REDIS_PORT: 6379,       
        },
    } 
  ]
};
  