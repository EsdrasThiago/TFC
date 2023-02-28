import { Request, Response } from 'express';
import IServiceUser from '../interfaces/IServiceUser';

class UserController {
  private _user: IServiceUser;

  constructor(service: IServiceUser) {
    this._user = service;
  }

  async loginUser(req: Request, res: Response) {
    const { body } = req;
    if (!body.email || !body.password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    const token = await this._user.loginUser(body);
    return res.status(200).json(token);
  }
}

export default UserController;
