import { Request, Response, NextFunction } from 'express';

export default function passwordValidation(req: Request, res: Response, next: NextFunction) {
  const { password } = req.body;
  if (!password) return res.status(400).json({ message: 'All fields must be filled' });
  const passwordLength = password.length < 6;
  if (passwordLength) return res.status(401).json({ message: 'Invalid email or password' });
  next();
}
