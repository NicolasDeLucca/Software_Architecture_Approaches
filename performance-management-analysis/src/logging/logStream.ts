import { Writable } from 'stream';

const logStream = (log_type: any) => new Writable({
    write: async (chunk, _, callback) => {
        try {
            const message = chunk.toString();
            const log = new log_type(JSON.parse(message));
            await log.save();
            callback(); 
        } catch (error) {
            console.error('Failed to save log: ', error);
            callback(error as Error);
        }
    }
});

export default logStream;