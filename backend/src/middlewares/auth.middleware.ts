import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { JWTPayload, RequestWithUser } from '../types/auth.types';

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const token = authHeader.split(' ')[1]; // Bearer token
    if (!token) {
      res.status(401).json({ message: 'No token provided' });
      return;
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JWTPayload;
    (req as RequestWithUser).user = decoded;

    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
}; 