import { queue } from '../taskLogic/bus';

async function removeAllFromQueue() {
    await queue.removeAll();
    console.log('Queue cleared successfully.');
    process.exit(); 
  }
  
removeAllFromQueue();