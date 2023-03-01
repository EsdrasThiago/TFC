import { ModelStatic } from 'sequelize';
import IServiceMatch from '../interfaces/IServiceMatch';
import Match from '../models/MatchModel';

export default class MatchService implements IServiceMatch {
  async findAll(status: boolean): Promise<Match[]> {
    if (status) {
      return this.model.findAll({
        where: { inProgress: status },
      });
    }
    return this.model.findAll();
  }

  protected model: ModelStatic<Match> = Match;
}
