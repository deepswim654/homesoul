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

const router = Router();
const authController = new AuthController();

// Public routes with rate limiting
router.post('/register', authLimiter, validateRequest(registerSchema), authController.register);
router.post('/login', authLimiter, validateRequest(loginSchema), authController.login);
router.post('/refresh', validateRequest(refreshSchema), authController.refresh);

// Email verification
router.get('/verify-email/:token', authController.verifyEmail);

// Password reset
router.post('/forgot-password', authLimiter, validateRequest(forgotPasswordSchema), authController.forgotPassword);
router.post('/reset-password/:token', validateRequest(resetPasswordSchema), authController.resetPassword);

// Protected routes
router.get('/me', authMiddleware, authController.me);

// Google OAuth routes
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false }),
  authController.googleCallback
);

export default router; 