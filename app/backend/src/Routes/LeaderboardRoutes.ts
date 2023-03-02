// import { app } from '../src/app'
import { Router, Request, Response } from 'express';
import LeaderboardService from '../database/services/LeaderboardServices';
import LeaderboardController from '../database/controller/LeaderboardController';

const leaderboardRoutes = Router();
const leaderboardService = new LeaderboardService();
const leaderController = new LeaderboardController(leaderboardService);

leaderboardRoutes.get(
  '/leaderboard/home',
  (req: Request, res: Response) => leaderController.findAll(req, res),
);

export default leaderboardRoutes;
