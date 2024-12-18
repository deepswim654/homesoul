import { randomBytes } from 'crypto';
import { User } from '../entities/User';
import { AppDataSource } from '../config/database';

const userRepository = AppDataSource.getRepository(User);

export const tokenService = {
  async generateEmailVerificationToken(): Promise<string> {
    return randomBytes(32).toString('hex');
  },

  async generatePasswordResetToken(): Promise<string> {
    return randomBytes(32).toString('hex');
  },

  async setVerificationToken(user: User): Promise<void> {
    user.verificationToken = await this.generateEmailVerificationToken();
    user.verificationTokenExpiry = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours
    await userRepository.save(user);
  },

  async setPasswordResetToken(user: User): Promise<void> {
    user.passwordResetToken = await this.generatePasswordResetToken();
    user.passwordResetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
    await userRepository.save(user);
  },

  async verifyEmailToken(token: string): Promise<User | null> {
    const user = await userRepository.findOne({
      where: {
        verificationToken: token,
        emailVerified: false,
      }
    });

    if (!user || !user.verificationTokenExpiry || user.verificationTokenExpiry < new Date()) {
      return null;
    }

    return user;
  },

  async verifyPasswordResetToken(token: string): Promise<User | null> {
    const user = await userRepository.findOne({
      where: {
        passwordResetToken: token,
      }
    });

    if (!user || !user.passwordResetTokenExpiry || user.passwordResetTokenExpiry < new Date()) {
      return null;
    }

    return user;
  },

  async clearVerificationToken(user: User): Promise<void> {
    user.verificationToken = undefined;
    user.verificationTokenExpiry = undefined;
    user.emailVerified = true;
    await userRepository.save(user);
  },

  async clearPasswordResetToken(user: User): Promise<void> {
    user.passwordResetToken = undefined;
    user.passwordResetTokenExpiry = undefined;
    await userRepository.save(user);
  },
}; 