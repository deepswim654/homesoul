import { Router } from 'express';
import passport from 'passport';
import { AuthController } from '../controllers/auth.controller';
import { authMiddleware } from '../middlewares/auth.middleware';
import { validateRequest } from '../middlewares/validate.middleware';
import {
  loginSchema,
  registerSchema,
  refreshSchema,
  forgotPasswordSchema,
  resetPasswordSchema
} from '../validations/auth.validation';
import { authLimiter } from '../middlewares/rate-limit.middleware';
import { RequestWithUser } from '../types/auth.types';

const router = Router();
const authController = new AuthController();

// Public routes with rate limiting
router.post('/register', authLimiter, validateRequest(registerSchema), authController.register.bind(authController));
router.post('/login', authLimiter, validateRequest(loginSchema), authController.login.bind(authController));
router.post('/refresh', validateRequest(refreshSchema), authController.refresh.bind(authController));

// Email verification
router.get('/verify-email/:token', authController.verifyEmail.bind(authController));

// Password reset
router.post('/forgot-password', authLimiter, validateRequest(forgotPasswordSchema), authController.forgotPassword.bind(authController));
router.post('/reset-password/:token', validateRequest(resetPasswordSchema), authController.resetPassword.bind(authController));

// Protected routes
router.get('/me', authMiddleware, (req, res) => authController.me(req as RequestWithUser, res));

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback.bind(authController)
);

export default router; 