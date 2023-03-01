// import { app } from '../src/app'
import { Router, Request, Response } from 'express';
import MatchService from '../database/services/MatchServices';
import MatchController from '../database/controller/MatchController';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes.get('/matches', (req: Request, res: Response) => matchController.findAll(req, res));

export default matchRoutes;
