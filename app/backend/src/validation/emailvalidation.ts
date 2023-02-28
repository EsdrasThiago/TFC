import { Request, Response, NextFunction } from 'express';

export default function emailValidation(req: Request, res: Response, next: NextFunction) {
  const { email } = req.body;
  if (!email) return res.status(400).json({ message: 'All fields must be filled' });
  const regexEmail = /\S+@\S+\.\S+/;
  const emailFormatVerify = regexEmail.test(email);
  if (!emailFormatVerify) return res.status(401).json({ message: 'Invalid email or password' });
  next();
}
