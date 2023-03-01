// import { app } from '../src/app'
import { Router, Request, Response } from 'express';
import tokenValidation from '../validation/tokenvalidation';
import UserController from '../database/controller/UserController';
import UserService from '../database/services/UserServices';
import emailValidation from '../validation/emailvalidation';
import passwordValidation from '../validation/passwordvalidation';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post(
  '/login',
  emailValidation,
  passwordValidation,
  (req: Request, res: Response) => userController.loginUser(req, res),
);

userRoutes.get(
  '/login/role',
  tokenValidation,
  (req: Request, res: Response) => userController.findRole(req, res),
);

export default userRoutes;
