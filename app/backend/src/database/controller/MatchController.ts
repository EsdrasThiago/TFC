import { Request, Response } from 'express';
import IServiceMatch from '../interfaces/IServiceMatch';

class MatchController {
  private _match: IServiceMatch;

  constructor(service: IServiceMatch) {
    this._match = service;
  }

  async findAll(req: Request, res: Response) {
    const { inProgress } = req.query;
    const status = inProgress === 'true';
    if (inProgress) {
      const matchs = await this._match.findByInProgress(status);
      return res.status(200).json(matchs);
    }
    const matchs = await this._match.findAll();
    if (!matchs) return res.status(400).json('test');
    return res.status(200).json(matchs);
  }
}

export default MatchController;
