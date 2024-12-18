import { Request, Response } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import * as jwt from 'jsonwebtoken';
import { RequestWithUser } from '../types/auth.types';
import { emailService } from '../services/email.service';
import { tokenService } from '../services/token.service';

const userRepository = AppDataSource.getRepository(User);

const generateTokens = (userId: string) => {
  const accessToken = jwt.sign(
    { userId },
    process.env.JWT_SECRET as string,
    { expiresIn: process.env.JWT_EXPIRATION }
  );

  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET as string,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export class AuthController {
  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, name } = req.body;

      // Check if user exists
      const existingUser = await userRepository.findOne({ where: { email } });
      if (existingUser) {
        res.status(400).json({ message: 'User already exists' });
        return;
      }

      // Create new user
      const user = new User();
      user.email = email;
      user.password = password; // Will be hashed by @BeforeInsert
      user.name = name;

      await userRepository.save(user);

      // Generate verification token and send email
      await tokenService.setVerificationToken(user);
      await emailService.sendVerificationEmail(user.email, user.verificationToken!);

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user.id);

      res.status(201).json({
        message: 'User registered successfully. Please check your email to verify your account.',
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async verifyEmail(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;

      const user = await tokenService.verifyEmailToken(token);
      if (!user) {
        res.status(400).json({ message: 'Invalid or expired verification token' });
        return;
      }

      await tokenService.clearVerificationToken(user);
      await emailService.sendWelcomeEmail(user.email, user.name || 'User');

      res.json({ message: 'Email verified successfully' });
    } catch (error) {
      console.error('Email verification error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async forgotPassword(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;

      const user = await userRepository.findOne({ where: { email } });
      if (!user) {
        // Don't reveal whether a user exists
        res.json({ message: 'If an account exists, you will receive a password reset email' });
        return;
      }

      await tokenService.setPasswordResetToken(user);
      await emailService.sendPasswordResetEmail(user.email, user.passwordResetToken!);

      res.json({ message: 'If an account exists, you will receive a password reset email' });
    } catch (error) {
      console.error('Forgot password error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async resetPassword(req: Request, res: Response): Promise<void> {
    try {
      const { token } = req.params;
      const { password } = req.body;

      const user = await tokenService.verifyPasswordResetToken(token);
      if (!user) {
        res.status(400).json({ message: 'Invalid or expired reset token' });
        return;
      }

      user.password = password;
      await tokenService.clearPasswordResetToken(user);
      await userRepository.save(user);

      res.json({ message: 'Password reset successfully' });
    } catch (error) {
      console.error('Password reset error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user with password (select: false by default)
      const user = await userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'name', 'role', 'emailVerified']
      });

      if (!user) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Validate password
      const isValidPassword = await user.validatePassword(password);
      if (!isValidPassword) {
        res.status(401).json({ message: 'Invalid credentials' });
        return;
      }

      // Check if email is verified
      if (!user.emailVerified) {
        // Resend verification email
        await tokenService.setVerificationToken(user);
        await emailService.sendVerificationEmail(user.email, user.verificationToken!);

        res.status(403).json({
          message: 'Please verify your email address. A new verification email has been sent.'
        });
        return;
      }

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user.id);

      res.json({
        message: 'Login successful',
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified
        }
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async me(req: RequestWithUser, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const userId = req.user.userId;
      const user = await userRepository.findOne({ where: { id: userId } });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
          emailVerified: user.emailVerified
        }
      });
    } catch (error) {
      console.error('Get user error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async refresh(req: Request, res: Response): Promise<void> {
    try {
      const { refreshToken } = req.body;

      if (!refreshToken) {
        res.status(400).json({ message: 'Refresh token is required' });
        return;
      }

      // Verify refresh token
      const decoded = jwt.verify(
        refreshToken,
        process.env.JWT_REFRESH_SECRET as string
      ) as { userId: string };

      // Generate new tokens
      const tokens = generateTokens(decoded.userId);

      res.json({
        message: 'Token refreshed successfully',
        ...tokens
      });
    } catch (error) {
      console.error('Refresh token error:', error);
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  }
} 