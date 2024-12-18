import { Router } from 'express';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import { loginSchema, registerSchema, refreshSchema } from '../validations/auth.validation';
import { authLimiter } from '../middlewares/rate-limit.middleware';

const router = Router();
const authController = new AuthController();

// Public routes with rate limiting
router.post('/register', authLimiter, validateRequest(registerSchema), authController.register);
router.post('/login', authLimiter, validateRequest(loginSchema), authController.login);
router.post('/refresh', validateRequest(refreshSchema), authController.refresh);

// Protected routes
router.get('/me', authMiddleware, authController.me);

export default router; 