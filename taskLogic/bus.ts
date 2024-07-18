import { BullQueueAdapter } from '../utils/bullQueueAdapter';
import { redis_connection } from '../config/redis';
import { TaskIn } from '../api/taskDtos';

export const queue = 
    new BullQueueAdapter<TaskIn>('taskQueue', redis_connection);