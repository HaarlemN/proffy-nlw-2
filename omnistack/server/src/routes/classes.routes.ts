import { Router } from 'express';

// CONTROLLER
import ClassesController from '../controllers/ClassesController';

const router = Router();

const cc = new ClassesController();

router.get('/classes', cc.index);
router.post('/classes', cc.store);

export default router;
