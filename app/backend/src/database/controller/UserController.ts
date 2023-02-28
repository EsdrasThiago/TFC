import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';
import newToken from '../../validation/jwtconfig';

class UserController {
  private _user: IServiceUser;

  constructor(service: IServiceUser) {
    this._user = service;
  }

  async loginUser(req: Request, res: Response) {
    const { body } = req;
    const login = await this._user.loginUser(body);
    const token = newToken(body.password);
    if (!login) return res.status(401).json({ message: 'Invalid email or password' });
    return res.status(200).json(token);
  }

  async findRole(req: Request, res: Response) {
    const { body } = req;
    const role = await this._user.findRole(body);
    if (!role) return res.status(401).json({ message: 'Invalid email or password' });
    return res.status(200).json(role);
  }
}

export default UserController;
