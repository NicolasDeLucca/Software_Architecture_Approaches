import dotenv from 'dotenv';
import axios from 'axios';
import breaker from './circuitBreaker';

dotenv.config();

const EXTERNAL_SERVICE_URL = process.env.EXTERNAL_SERVICE_URL || 'http://localhost:3001';

const configure = async (retry: string, failure: string, trans_failure: string) =>
{
    const config_url = `${EXTERNAL_SERVICE_URL}/configure`;
    const configuration = { retry, failure, trans_failure };

    const response = await axios.post(config_url, configuration);
    const responseDetails = [response.status, response.data];
    
    return responseDetails;
};

const getData = async () =>
{
    const response = await breaker.fire();
    const responseDetails = [response.status, response.data];
    
    return responseDetails;
};

export { getData, configure };