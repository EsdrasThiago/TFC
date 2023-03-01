// import User from '../models/UserModel';
// import IError from './IError';
import User from '../models/UserModel';
// import IUser from './IUser';

export default interface IServiceUser {
  loginUser(email: string): Promise<User | null>;
}
