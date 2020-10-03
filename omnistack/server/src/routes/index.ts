import { Router } from 'express';

import classes from './classes.routes';
import connections from './connections.routes';

const routes  = Router();

routes.use(classes);
routes.use(connections);

export default routes;
