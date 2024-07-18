import Bull, { Job, Queue as BullQueue } from 'bull';

export class BullQueueAdapter<T> {
  private queue: BullQueue;

  constructor(queueName: string, redisConnection?: any) {
    if (!redisConnection)
      this.queue = new Bull(queueName);
    else
      this.queue = new Bull(queueName, { redis: redisConnection });

    console.log('Connection to Redis has been established successfully.');
    
    this.queue.on('error', (error: Error) => {
      console.error('Queue error:', error);
    });

    this.queue.on('failed', (job, err) => {
      console.error(`Job ${job.id} failed with error ${err.message}`);
    });
  }

  async add(data: T): Promise<void> {
    await this.queue.add(data);
  }

  async remove(jobId: number): Promise<void> {
    await this.queue.getJob(jobId).then((job) => job?.remove());
  }

  async removeAll(): Promise<void> {
    await this.queue.empty();
  }

  async get(jobId: number): Promise<Job<any>|null>{
    return this.queue.getJob(jobId);
  }

  process(callback: (data: T) => Promise<void>): void {
    this.queue.process(async (job: Job) => {
      await callback(job.data);
    });
  }
}