import dotenv from 'dotenv';
import axios from 'axios';
import logger from './logger';
import configuration from './config';

import CircuitBreaker = require('opossum');
dotenv.config();

const externalServiceUrl = process.env.EXTERNAL_SERVICE_URL || 'http://localhost:3001';

const data = async () => {
    const response = await axios.get(externalServiceUrl + '/data');
    return response;
}

const breaker = new CircuitBreaker(data, configuration);

breaker.fallback(() => ({ message: 'Service is currently unavailable' }));

// states

breaker.on('open', () => {
    logger.warn('Circuit Breaker abierto');
});

breaker.on('halfOpen', () => {
    logger.info('Circuit Breaker medio abierto');
});

breaker.on('close', () => {
    logger.info('Circuit Breaker cerrado');
});

// events

breaker.on('failure', () => {
    logger.error('Circuit Breaker detectó una falla');
});

breaker.on('success', () => {
    logger.info('Circuit Breaker detectó una llamada exitosa');
});

export default breaker;