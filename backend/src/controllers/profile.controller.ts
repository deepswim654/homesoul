import { Request, Response } from 'express';
import { AppDataSource } from '../config/database';
import { User } from '../entities/User';
import { RequestWithUser } from '../types/auth.types';

const userRepository = AppDataSource.getRepository(User);

export class ProfileController {
  async updateProfile(req: RequestWithUser, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const { name, email, bio } = req.body;
      const userId = req.user.userId;

      // Check if email is already taken by another user
      if (email) {
        const existingUser = await userRepository.findOne({
          where: { email, id: userId },
        });
        if (existingUser && existingUser.id !== userId) {
          res.status(400).json({ message: 'Email is already taken' });
          return;
        }
      }

      // Update user profile
      await userRepository.update(userId, {
        name,
        email,
        bio,
      });

      // Get updated user
      const updatedUser = await userRepository.findOne({
        where: { id: userId },
      });

      if (!updatedUser) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({
        message: 'Profile updated successfully',
        user: {
          id: updatedUser.id,
          name: updatedUser.name,
          email: updatedUser.email,
          bio: updatedUser.bio,
          role: updatedUser.role,
          emailVerified: updatedUser.emailVerified,
        },
      });
    } catch (error) {
      console.error('Profile update error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getProfile(req: RequestWithUser, res: Response): Promise<void> {
    try {
      if (!req.user) {
        res.status(401).json({ message: 'Not authenticated' });
        return;
      }

      const userId = req.user.userId;
      const user = await userRepository.findOne({
        where: { id: userId },
      });

      if (!user) {
        res.status(404).json({ message: 'User not found' });
        return;
      }

      res.json({
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          bio: user.bio,
          role: user.role,
          emailVerified: user.emailVerified,
        },
      });
    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
} 