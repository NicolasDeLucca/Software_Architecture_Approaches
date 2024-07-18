import { Router } from 'express';
import { setExternalServiceConfig, getExternalServiceData } from './controller';

const router = Router();

router.post('/configure-service', setExternalServiceConfig);
router.get('/fetch-data', getExternalServiceData);

export default router;