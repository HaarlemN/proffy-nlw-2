import { Router } from 'express';

// CONTROLLER
import ConnectionsController from '../controllers/ConnectionsController';

const router = Router();

const cc = new ConnectionsController();

router.get('/connections', cc.index);
router.post('/connections', cc.store);

export default router;
