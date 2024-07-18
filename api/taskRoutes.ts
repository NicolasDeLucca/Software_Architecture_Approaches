import { Router } from 'express';
import { createTask, getTaskStatus } from './taskController';

const router = Router();

router.post('/tasks', createTask);
router.get('/tasks/:id', getTaskStatus);

export default router;
