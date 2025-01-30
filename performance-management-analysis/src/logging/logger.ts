import winston from 'winston';
import logStream from './logStream';

const logger = (log_type:any) => winston.createLogger({
    level: 'info',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    transports: [
        new winston.transports.Stream({ stream: logStream(log_type) })
    ]
});

export default logger;