import { Request, Response } from 'express';
import { configure, retrieveData } from './service';
import { ERROR_400 } from './errorHandler';

const setConfiguration = async (req: Request, res: Response) => 
{
    const { retry, failure, transient_failure } = req.body;
    try {
        configure(transient_failure, failure, retry);
        res.status(200).json({ message: 'Configuration set successfully' });
    }
    catch (error: any) {
        if (error.name == ERROR_400) 
            res.status(400).json({ message: error.message });
        else
            res.status(500).json({ message: 'Internal server error' });
    }
}

const getData = async (req: Request, res: Response) => 
{
    const callResponse = await retrieveData();

    const status = Number(callResponse[0]);
    const jsonResponse = callResponse[1];
    res.status(status).json(jsonResponse);
}

export { setConfiguration, getData }

