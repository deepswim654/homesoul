import { Request } from 'express';
import { User } from '../entities/User';

export interface JWTPayload {
  userId: string;
}

export interface RequestWithUser extends Request {
  user?: JWTPayload;
}

export interface AuthenticatedRequest extends Request {
  user: User;
} 