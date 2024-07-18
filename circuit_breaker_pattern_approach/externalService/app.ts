import express from 'express';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import routes from './routes'; 

const app = express();
app.use(bodyParser.json());
app.use(routes);

dotenv.config();
const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`External Service is running on port ${PORT}`);
});

export default app;