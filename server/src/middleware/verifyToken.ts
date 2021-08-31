import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const rawToken = req.headers.authorization;
  const token = rawToken?.split(' ')[1];

  if (!rawToken || !token) {
    return res.status(401).json({
      message: 'No token, authorization denied',
    });
  }

  try {
    const jwtKey = process.env.JWT_KEY;

    let decoded;
    if (typeof token === 'string' && typeof jwtKey === 'string') {
      decoded = jwt.verify(token, jwtKey);
    }

    (req as any).userData = decoded;
  } catch (error) {
    return res.status(401).json({ error });
  }

  next();
};

export default verifyToken;
