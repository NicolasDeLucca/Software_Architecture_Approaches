const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  apps: [
    {
      name: 'api',
      script: './dist/api/app.js',
      instances: '8',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: process.env.NODE_DEV,
        API_PORT: process.env.API_PORT,
        MYSQL_PORT: process.env.MYSQL_PORT,
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_NAME: process.env.MYSQL_NAME,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        REDIS_PORT: process.env.REDIS_PORT,
        REDIS_HOST: process.env.REDIS_HOST,
        REDIS_USER: process.env.REDIS_USER,
        REDIS_PASSWORD: process.env.REDIS_PASSWORD,
      },
      env_production: {
        NODE_ENV: process.env.NODE_PROD,
      },
      watch: false,
      max_restarts: 5,
      autorestart: true,
      restart_delay: 1000,
      max_memory_restart: '1G'
    },
    {
      name: 'worker',
      script: './dist/workers/workerServer.js',
      args: '1 5000', 
      instances: 8,
      exec_mode: 'fork',
      env: {
        NODE_ENV: process.env.NODE_DEV,
      },
      env_production: {
        NODE_ENV: process.env.NODE_PROD,
      },
      watch: true,
      max_restarts: 10,
      autorestart: true,
      restart_delay: 1000
    },
  ],
};
