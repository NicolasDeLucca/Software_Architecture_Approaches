import dotenv from 'dotenv';
dotenv.config();

const configuration = 
{
    TRANSIENT_FAILURE_RATE : Number(process.env.TRANSIENT_FAILURE_RATE) || 0,
    FAILURE_RATE : Number(process.env.FAILURE_RATE) || 0,
    RETRY_ATTEMPTS : Number(process.env.RETRY_ATTEMPTS) || 0
}

export default configuration;