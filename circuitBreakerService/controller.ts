import { Request, Response } from 'express';
import { configure, getData } from './service';

const setExternalServiceConfig = async (req: Request, res: Response) => {
    try {
        const { retry, failure, transient_failure } = req.body;
        const callDetails = await configure(retry, failure, transient_failure);
        
        const statusCode = callDetails[0];
        const message = callDetails[1];
        res.status(statusCode).json(message);
    }
    catch (error) {
        res.status(500).json({ error: 'Failed to set external server configuration' });
    }
};

const getExternalServiceData = async (req: Request, res: Response) => {
    try {
        const callDetails = await getData();

        const statusCode = callDetails[0];
        const message = callDetails[1];
        res.status(statusCode).json(message);
    } 
    catch (error) {
        res.status(500).json({ error: 'Failed to fetch data' });
    }
};

export { setExternalServiceConfig, getExternalServiceData };