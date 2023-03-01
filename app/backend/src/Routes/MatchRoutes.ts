// import { app } from '../src/app'
import { Router, Request, Response } from 'express';
import MatchService from '../database/services/MatchServices';
import MatchController from '../database/controller/MatchController';
import tokenValidation from '../validation/tokenvalidation';

const matchRoutes = Router();
const matchService = new MatchService();
const matchController = new MatchController(matchService);

matchRoutes.patch(
  '/matches/:id/finish',
  tokenValidation,
  (req: Request, res: Response) => matchController.finishMatch(req, res),
);

matchRoutes.patch(
  '/matches/:id',
  tokenValidation,
  (req: Request, res: Response) => matchController.editMatch(req, res),
);

matchRoutes.post(
  '/matches',
  tokenValidation,
  (req: Request, res: Response) => matchController.newMatch(req, res),
);

matchRoutes.get('/matches', (req: Request, res: Response) => matchController.findAll(req, res));

export default matchRoutes;
