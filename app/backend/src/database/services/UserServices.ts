import { ModelStatic } from 'sequelize';
import newToken from '../../validation/jwtconfig';
// import IError from '../interfaces/IError';
import IServiceUser from '../interfaces/IServiceUser';
import IUser from '../interfaces/IUser';
import User from '../models/UserModel';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;
  async loginUser(user: IUser): Promise<string> {
    const { email, password } = user;

    const login = this.model.findOne({
      where: { email, password },
    });

    if (!login) {
      throw new Error('Invalid email or password');
    }

    const token = newToken(password);

    return token;
  }

  // async loginUser(user: IUser): Promise<User> {
  //   const { username, role, email, password } = user;
  //   return this.model.create({
  //     username,
  //     role,
  //     email,
  //     password,
  //   });
  // }
}
