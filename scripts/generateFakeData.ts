import { mysql_connection } from '../config/mysql';
import { faker } from '@faker-js/faker';
const mysql = require('mysql2/promise');

const NUMBER_OF_USERS = 100;
const NUMBER_OF_PRODUCTS = 100;
const NUMBER_OF_ORDERS = 100;

async function generate() {
    const connection = await mysql.createConnection(mysql_connection);
    try {
        await connection.beginTransaction();
        for (let i = 0; i < NUMBER_OF_USERS; i++) {
            const name = faker.person.fullName();
            const email = faker.internet.email();
            await connection.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        }
        for (let i = 0; i < NUMBER_OF_PRODUCTS; i++) {
            const name = faker.commerce.productName();
            const price = faker.commerce.price();
            await connection.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
        }
        for (let i = 0; i < NUMBER_OF_ORDERS; i++) {
            const userId = Math.floor(Math.random() * NUMBER_OF_USERS) + 1;
            const total = faker.commerce.price();
            const [orderResult] = await connection.query('INSERT INTO orders (user_id, total) VALUES (?, ?)', [userId, total]);
            const orderId = orderResult.insertId; 
            const numberOfItems = Math.floor(Math.random() * 10) + 1;
            for (let j = 0; j < numberOfItems; j++) {
                const productId = Math.floor(Math.random() * NUMBER_OF_PRODUCTS) + 1;
                const quantity = Math.floor(Math.random() * 5) + 1;
                await connection.query('INSERT INTO order_items (order_id, product_id, quantity) VALUES (?, ?, ?)', [orderId, productId, quantity]);
            }
        }
        await connection.commit();
        console.log('Fake data generated successfully.');
    } catch (error) {
        console.error('Error generating fake data:', error);
        await connection.rollback();
    } finally {
        await connection.end();
    }
}

generate();
