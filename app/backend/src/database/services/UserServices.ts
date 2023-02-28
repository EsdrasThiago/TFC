import { ModelStatic } from 'sequelize';
// import IError from '../interfaces/IError';
import IServiceUser from '../interfaces/IServiceUser';
import IUser from '../interfaces/IUser';
import User from '../models/UserModel';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;
  async loginUser(user: IUser): Promise<User | null> {
    const { email, password } = user;
    const login = this.model.findOne({
      where: { email, password },
    });
    if (!login) {
      throw new Error('Invalid email or password');
    }

    return login;
  }

  async findRole(user: IUser): Promise<User | null> {
    const { email, password } = user;
    const userRole = this.model.findOne({
      attributes: ['role'],
      where: { email, password },
    });
    return userRole;
  }
}
