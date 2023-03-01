import { ModelStatic } from 'sequelize';
import IGoals from '../interfaces/IGoals';
import IMatch from '../interfaces/IMatch';
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

  async editMatch(id: number, data: IGoals): Promise<[affectedCount: number]> {
    const { homeTeamGoals, awayTeamGoals } = data;
    return this.model.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id } },
    );
  }

  async newMatch(data: IMatch): Promise<Match> {
    const { homeTeamGoals, awayTeamGoals,
      homeTeamId, awayTeamId } = data;
    return this.model.create({
      homeTeamId,
      homeTeamGoals,
      awayTeamId,
      awayTeamGoals,
      inProgress: true,
    });
  }

  protected model: ModelStatic<Match> = Match;
}
