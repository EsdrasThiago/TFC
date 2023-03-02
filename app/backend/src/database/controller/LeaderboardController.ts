import { Request, Response } from 'express';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';

class LeaderboardController {
  private _leaderboard: IServiceLeaderboard;

  constructor(service: IServiceLeaderboard) {
    this._leaderboard = service;
  }

  async findAll(req: Request, res: Response) {
    const leaderboard = await this._leaderboard.findAll();
    return res.status(200).json(leaderboard);
  }
}

export default LeaderboardController;
