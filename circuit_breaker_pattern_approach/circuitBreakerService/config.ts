import dotenv from 'dotenv';

dotenv.config();

const configuration = {
    timeout: Number(process.env.TIMEOUT || '0'), 
    errorThresholdPercentage: Number(process.env.ERROR_THRESHOLD_PERCENTAGE || '0'), 
    resetTimeout: Number(process.env.RESET_TIMEOUT || '0') 
};

export default configuration;