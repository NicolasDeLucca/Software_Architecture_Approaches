import { Task } from '../db/dataaccess';
import { TaskOut, TaskIn, toTask } from '../api/taskDtos';
import { TaskStatus } from './status';
import { queue } from './bus';

const addTask = async (task : TaskIn) => { 
    const task_data = toTask(task);
    const newTask = await Task.create(task_data);
    await queue.add(task);
    return newTask.id;
}

const getTask = async (taskId: number) => {
    const taskDto: TaskOut = { id: taskId, status: 'not_in_queue' };
    const job = await queue.get(taskId);
    if (job)
        taskDto.status = await job.getState();
    else {
        const retrievedTask = await Task.findByPk(taskId);
        if (!retrievedTask)
            return null;
        taskDto.status = retrievedTask.status.toString();
    }
    return taskDto;
}

const updateTaskStatus = async (
    taskName: string,   
    status: TaskStatus
) => {
        const task = await Task.findOne(
            {where: {name: taskName}}
        );

        if (!task)
            return;
        
        task.status = status;
        await task.save();
}

const processTask = async (
    job: (data: TaskIn) => Promise<void>
) => {
        let taskName;
        queue.process(async (task) => {
            taskName = task.name;
            await updateTaskStatus(taskName, TaskStatus.active);
            await job(task);
        });
        
        if (taskName!=undefined){
            console.log(`Processing task ${taskName}`);
            console.log(`Task ${taskName} completed`);
            await updateTaskStatus(taskName, TaskStatus.completed);
        }
};

export { addTask, getTask, processTask };