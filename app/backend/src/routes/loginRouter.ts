import { Router } from 'express';
import validateToken from '../middlewares/tokenValidation';
import LoginController from '../controllers/LoginController';
import loginValidation from '../middlewares/loginValidation';

const router = Router();

router.post('/', loginValidation, LoginController.login);
router.get('/role', validateToken, LoginController.getRole);
export default router;
