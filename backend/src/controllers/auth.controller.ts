import { Request, Response } from 'express';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';
import * as jwt from 'jsonwebtoken';
import { RequestWithUser } from '../types/auth.types';

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

      // Generate tokens
      const { accessToken, refreshToken } = generateTokens(user.id);

      res.status(201).json({
        message: 'User registered successfully',
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role
        }
      });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      // Find user with password (select: false by default)
      const user = await userRepository.findOne({
        where: { email },
        select: ['id', 'email', 'password', 'name', 'role']
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
          role: user.role
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
          role: user.role
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