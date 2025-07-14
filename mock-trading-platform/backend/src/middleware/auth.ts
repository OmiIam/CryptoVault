import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

export interface AuthRequest extends Request {
  userId?: number;
  isAdmin?: boolean;
}

const JWT_SECRET = process.env.JWT_SECRET || 'mock-trading-platform-secret-key';

export const authenticateToken = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    
    req.userId = decoded.userId;
    req.isAdmin = decoded.isAdmin;
    next();
  });
};

export const requireAdmin = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.isAdmin) {
    return res.status(403).json({ error: 'Admin access required' });
  }
  next();
};

export const generateToken = (userId: number, isAdmin: boolean = false): string => {
  return jwt.sign(
    { userId, isAdmin },
    JWT_SECRET,
    { expiresIn: '24h' }
  );
};