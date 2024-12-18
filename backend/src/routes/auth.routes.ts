import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema } from '../validations/auth.validation';

const router = Router();
const authController = new AuthController();

// Public routes
router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);

// Protected routes
router.get('/me', authMiddleware, authController.me);

export default router; 