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
    console.log(rightPassword);
    if (rightPassword) {
      return res.status(200).json(token);
    }
    return res.status(401).json({ message: INVALID_MESSAGE });
  }

  async findRole(req: Request, res: Response) {
    const { body } = req;
    const role = await this._user.findRole(body.email);
    if (!role) return res.status(401).json({ message: INVALID_MESSAGE });

    return res.status(200).json(role);
  }
}

export default UserController;
