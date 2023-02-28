// import { app } from '../src/app'
import TeamController from '../database/controller/TeamController'
import TeamService from '../database/services/TeamServices'
import { Router, Request, Response } from "express";

const teamRoutes = Router()
const teamService = new TeamService();
const teamController = new TeamController(teamService);

teamRoutes.get('/teams', (req: Request, res: Response) => teamController.findAll(req, res))

teamRoutes.get('/teams/:id', (req: Request, res: Response) => teamController.findById(req, res))

export default teamRoutes;