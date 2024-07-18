import { Request, Response } from 'express';
import { addTask, getTask } from '../taskLogic/taskService';

export const createTask = async (req: Request, res: Response) => {
  const task = req.body;
  try {
    const taskId = await addTask(task);
    return res.status(201).json({ message: 'Task created successfully', id: taskId});
  } 
  catch (error) {
    console.error('Error creating task:', error);
    return res.status(500).json({ error: 'Failed to create task' });
  }
};

export const getTaskStatus = async (req: Request, res: Response) => {
  const taskId = parseInt(req.params.id);
  try {
    const taskDto = await getTask(taskId);
    if (!taskDto)
      return res.status(404).json({ error: 'Task not found' });
    else
      return res.status(200).json(taskDto);
  } 
  catch (error) {
    console.error('Error getting task status:', error);
    return res.status(500).json({ error: 'Failed to get task status' });
  }
};