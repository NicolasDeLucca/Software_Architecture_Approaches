import configuration from "./config";
import { throwError } from './errorHandler';

const configure = (
    transient_failure_percentage?: string, 
    failure_percentage?: string, 
    retry_attempts?: string
) => 
{
    if (failure_percentage !== undefined) {
        const failure_percentage_candidate = Number(failure_percentage);
        if (isNaN(failure_percentage_candidate) || failure_percentage_candidate < 0)
            throwError('Failure Percentage');
        configuration.FAILURE_RATE = failure_percentage_candidate / 100;
    }
    
    if (retry_attempts !== undefined) {
        const retry_attempts_candidate = Number(retry_attempts);
        if (isNaN(retry_attempts_candidate) || retry_attempts_candidate < 0)
            throwError('Retry');
        configuration.RETRY_ATTEMPTS = retry_attempts_candidate; 
    }

    if (transient_failure_percentage !== undefined) {
        const transient_failure_percentage_candidate = Number(transient_failure_percentage);
        if (isNaN(transient_failure_percentage_candidate) || transient_failure_percentage_candidate < 0)
            throwError('Transient Failure');
        configuration.TRANSIENT_FAILURE_RATE = transient_failure_percentage_candidate / 100;
    }
};

const retrieveData = async () => {
    let responseDetails = (status: number, info: string, attempts: number) => { 
        return [status, {message: info,  attempts}];
    };
    let attempts = 0;
    while (attempts < configuration.RETRY_ATTEMPTS) {
        attempts ++;
        if (Math.random() < configuration.FAILURE_RATE)
            continue; 
        else if (Math.random() < configuration.TRANSIENT_FAILURE_RATE){
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
        }
        else 
            return responseDetails(200, 'Data retrieved successfully', attempts);
    }
    return responseDetails(500, 'Failed after retries', attempts);
}

export { configure, retrieveData }

