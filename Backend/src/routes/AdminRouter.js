import {Router} from 'express';
import { verifyJWT, verifyAdmin } from '../middlewares/auth.middleware.js';
import {get_All_users} from '../controllers/AdminController.js';

const router = Router();

router.use(verifyJWT, verifyAdmin);

router.get('/getusers', get_All_users);
export default router;
