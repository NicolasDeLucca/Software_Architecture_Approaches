import { Router } from 'express';
import { setConfiguration, getData } from './controller';

const router = Router();

router.post('/configure', setConfiguration);
router.get('/data', getData);

export default router;