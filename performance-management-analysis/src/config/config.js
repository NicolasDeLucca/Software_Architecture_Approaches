require('dotenv').config();

module.exports = {
  development: {
    database: process.env.SALES_DEV_DB_NAME || 'sales-db-dev',
    username: process.env.SALES_DB_USER || 'root',
    password: process.env.SALES_DB_PASSWORD || 'password',
    host: process.env.SALES_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    port: Number(process.env.SALES_DB_PORT) || 3306,
    logging: false
  },    
  test: {
    database: process.env.SALES_TEST_DB_NAME || 'sales-db-test',
    username: process.env.SALES_DB_USER || 'root',
    password: process.env.SALES_DB_PASSWORD || 'password',
    host: process.env.SALES_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    port: Number(process.env.SALES_DB_PORT) || 3306,
    logging: false
  },
  production: {
    database: process.env.SALES_PROD_DB_NAME || 'sales-db',
    username: process.env.SALES_DB_USER || 'root',
    password: process.env.SALES_DB_PASSWORD || 'password',
    host: process.env.SALES_DB_HOST || '127.0.0.1',
    dialect: 'mysql',
    port: Number(process.env.SALES_DB_PORT) || 3306,
    logging: false,
    pool: {
      max: 10, // Número máximo de conexiones en el pool
      min: 0,
      acquire: 50000, // Tiempo máximo para obtener una conexión antes de lanzar un error (en ms)
      idle: 20000, // Tiempo que una conexión inactiva puede permanecer en el pool antes de cerrarse (en ms)
    }  
  }
};