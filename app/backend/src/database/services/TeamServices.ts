import { ModelStatic } from 'sequelize';
import IServiceTeam from '../interfaces/IServiceTeam';
// import ITeam from '../interfaces/ITeam';
import Team from '../models/TeamModel';

export default class TeamService implements IServiceTeam {
  async findAll(): Promise<Team[]> {
    return this.model.findAll();
  }

  async findById(id: number): Promise<Team> {
    const team = await this.model.findOne({ where: { id } });
    if (!team) throw new Error('Id nao encontrado');
    return team;
  }

  protected model: ModelStatic<Team> = Team;
}
