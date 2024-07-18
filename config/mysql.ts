import dotenv from 'dotenv';

dotenv.config();

export const mysql_connection = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_NAME,
    port: Number(process.env.MYSQL_PORT)
};