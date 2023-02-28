// import User from '../models/UserModel';
// import IError from './IError';
import IUser from './IUser';

export default interface IServiceUser {
  loginUser(user: IUser): Promise<string>;
}
