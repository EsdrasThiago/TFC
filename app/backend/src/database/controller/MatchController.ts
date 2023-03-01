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

  async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    const idToNumber = Number(id);
    await this._match.finishMatch(idToNumber);
    return res.status(200).json({ message: 'Finished' });
  }

  async editMatch(req: Request, res: Response) {
    const { id } = req.params;
    const idToNumber = Number(id);
    await this._match.editMatch(idToNumber, req.body);
    return res.status(200).json({ message: 'Edited' });
  }

  async newMatch(req: Request, res: Response) {
    const newMatch = await this._match.newMatch(req.body);
    if (typeof newMatch === 'string') {
      return res.status(404).json({ message: 'There is no team with such id!' });
    }
    return res.status(201).json(newMatch);
  }
}

export default MatchController;
