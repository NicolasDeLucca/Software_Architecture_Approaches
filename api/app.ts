import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import taskRoutes from './taskRoutes';
import sequelize from '../db/database';

dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(taskRoutes);

const PORT = process.env.API_PORT || 3000;

sequelize.authenticate()
  .then(() => {
    console.log('Connection to MySQL has been established successfully.');
    return sequelize.sync({ force: false, alter: true });
  })
  .then(() => 
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    })
  )
  .catch(err => {
    console.error('Unable to connect:', err);
  });

export default app;
