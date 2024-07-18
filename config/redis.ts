import dotenv from 'dotenv';

dotenv.config();

export const redis_connection = {
    host: process.env.REDIS_HOST,
    user: process.env.REDIS_USER,
    port: Number(process.env.REDIS_PORT),
    password: process.env.REDIS_PASSWORD,
};

