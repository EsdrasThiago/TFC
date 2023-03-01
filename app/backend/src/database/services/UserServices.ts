import { ModelStatic } from 'sequelize';
// import IError from '../interfaces/IError';
import IServiceUser from '../interfaces/IServiceUser';
// import IUser from '../interfaces/IUser';
import User from '../models/UserModel';

export default class UserService implements IServiceUser {
  protected model: ModelStatic<User> = User;
  async loginUser(email: string): Promise<User | null> {
    const login = await this.model.findOne({
      where: { email },
    });

    return login;
  }
}
