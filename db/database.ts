import dotenv from 'dotenv';
import { Sequelize } from 'sequelize-typescript';
import { Task } from './dataaccess';

dotenv.config();

const sequelize = new Sequelize({
  dialect: 'mysql',
  database: process.env.MYSQL_NAME,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  host: process.env.MYSQL_HOST,
  port: Number(process.env.MYSQL_PORT) || 3306,
  models: [Task], 
  logging: false,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

export default sequelize;