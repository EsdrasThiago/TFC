import { sign } from 'jsonwebtoken';

const TOKEN_SECRET = process.env.JWT_SECRET || 'batata';

export default function newToken(password: string) {
  const token = sign(
    { password },
    TOKEN_SECRET,
    {
      expiresIn: '7d',
      algorithm: 'HS256',
    },
  );
  return token;
}
