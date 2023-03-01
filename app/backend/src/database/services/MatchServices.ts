import { ModelStatic } from 'sequelize';
import IServiceMatch from '../interfaces/IServiceMatch';
import Match from '../models/MatchModel';
import Team from '../models/TeamModel';

export default class MatchService implements IServiceMatch {
  async findAll(): Promise<Match[]> {
    return this.model.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

  async findByInProgress(status: boolean): Promise<Match[]> {
    return this.model.findAll({
      where: { inProgress: status },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
  }

  async finishMatch(id: number): Promise<[affectedCount: number]> {
    return this.model.update(
      { inProgress: false },
      { where: { id } },
    );
  }

  protected model: ModelStatic<Match> = Match;
}
