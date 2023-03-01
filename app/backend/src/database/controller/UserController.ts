import { Request, Response } from 'express';
import { compare } from 'bcryptjs';
import IServiceUser from '../interfaces/IServiceUser';
import newToken from '../../validation/jwtconfig';

const INVALID_MESSAGE = 'Invalid email or password';

class UserController {
  private _user: IServiceUser;

  constructor(service: IServiceUser) {
    this._user = service;
  }

  async loginUser(req: Request, res: Response) {
    const { body } = req;
    const login = await this._user.loginUser(body.email);
    const token = newToken(body.email);
    if (!login) return res.status(401).json({ message: INVALID_MESSAGE });
    const rightPassword = await compare(body.password, login.password);
    if (rightPassword) {
      return res.status(200).json({ token });
    }
    return res.status(401).json({ message: INVALID_MESSAGE });
  }

  async findRole(req: Request, res: Response) {
    const email = req.body.jwt.password;
    if (!email) return res.status(401).json({ message: INVALID_MESSAGE });
    const user = await this._user.loginUser(email);
    if (!user) return res.status(401).json({ message: INVALID_MESSAGE });
    const { role } = user;

    return res.status(200).json({ role });
  }
}

export default UserController;
