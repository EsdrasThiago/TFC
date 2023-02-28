// import { app } from '../src/app'
import { Router, Request, Response } from 'express';
import TeamController from '../database/controller/TeamController';
import TeamService from '../database/services/TeamServices';

const teamRoutes = Router();
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/teams', (req: Request, res: Response) => teamController.findAll(req, res));

teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.findById(req, res));

export default teamRoutes;
