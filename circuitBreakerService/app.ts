import dotenv from 'dotenv';
import express from 'express';
import routes from './routes';

const app = express();
app.use(express.json());
app.use('/api', routes);

dotenv.config();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Circuit breaker service running on port ${PORT}`);
});