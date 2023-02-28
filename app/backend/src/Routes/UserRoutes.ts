// import { app } from '../src/app'
import { Router, Request, Response } from 'express';
import UserController from '../database/controller/UserController';
import UserService from '../database/services/UserServices';

const userRoutes = Router();
const userService = new UserService();
const userController = new UserController(userService);

userRoutes.post('/login', (req: Request, res: Response) => userController.loginUser(req, res));

export default userRoutes;
