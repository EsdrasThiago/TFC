import { Request, Response, NextFunction } from 'express';
// import { verify } from 'jsonwebtoken';
import jwt = require('jsonwebtoken');

const TOKEN_SECRET = process.env.JWT_SECRET || 'batata';

export default function tokenValidation(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;
  if (!authorization) return res.status(401).json({ message: 'Token not found' });

  try {
    req.body.jwt = jwt.verify(authorization, TOKEN_SECRET as string);
  } catch {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  return next();
}
