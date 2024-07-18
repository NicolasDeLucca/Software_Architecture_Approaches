import { processTask } from '../taskLogic/taskService';
import sequelize from '../db/database';

const NUM_WORKERS = Number(process.argv[2]);
const MILLISECONDS = Number(process.argv[3]);

async function work(id: number, ms: number) {
  try{
    let job = async () => {
      await new Promise((resolve) => setTimeout(resolve, ms));
    };
    await processTask(job);
  }
  catch(err){
    console.log(`Unable to start worker ${id}:`, err);
  }
};

const startWorkers = async () => {
  await sequelize.sync({ force: false, alter: false });
  const workers = [];

  for (let i = 0; i < NUM_WORKERS; i++){
    const jobProcess = work(i, MILLISECONDS);
    workers.push(jobProcess);
  }
  
  await Promise.all(workers);
};

startWorkers();



