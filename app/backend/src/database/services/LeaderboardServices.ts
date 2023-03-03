import { ModelStatic, QueryTypes } from 'sequelize';
// import ILeaderboard from '../interfaces/ILeaderboard';
// import ILeaderboard from '../interfaces/ILeaderboard';
import IServiceLeaderboard from '../interfaces/IServiceLeaderboard';
import Match from '../models/MatchModel';

export default class LeaderboardService implements IServiceLeaderboard {
  protected model: ModelStatic<Match> = Match;
  async findAll(): Promise<object[] | undefined> {
    const totalPoints = `SUM(IF(m.home_team_goals > m.away_team_goals, 3, 0) 
    + IF(m.home_team_goals = m.away_team_goals, 1, 0))`;
    const query = `SELECT t.team_name as name, 
    CAST(${totalPoints} as SIGNED) as totalPoints,
    COUNT(m.home_team_id) as totalGames,
    CAST(SUM(IF(m.home_team_goals > m.away_team_goals, 1, 0)) as SIGNED) as totalVictories,
    CAST(SUM(IF(m.home_team_goals = m.away_team_goals, 1, 0)) as SIGNED) as totalDraws,
    CAST(SUM(IF(m.home_team_goals < m.away_team_goals, 1, 0)) as SIGNED) as totalLosses,
    CAST(SUM(m.home_team_goals) as SIGNED) as goalsFavor,
    CAST(SUM(m.away_team_goals) as SIGNED) as goalsOwn,
    SUM(m.home_team_goals - m.away_team_goals) as goalsBalance,
    CAST(${totalPoints} / (COUNT(m.home_team_id) * 3) * 100 AS DECIMAL(6,2)) as efficiency
    FROM TRYBE_FUTEBOL_CLUBE.matches as m LEFT JOIN TRYBE_FUTEBOL_CLUBE.teams as t
    ON t.id = m.home_team_id WHERE m.in_progress = false
    GROUP BY m.home_team_id ORDER BY totalPoints DESC, totalVictories DESC,
    goalsBalance DESC, goalsFavor DESC, goalsOwn DESC;`;
    const leaderboard = await this.model.sequelize?.query(query, { type: QueryTypes.SELECT });
    return leaderboard;
  }
}

// LOGICA QUE INFELIZMENTE NÃO FUNCIONOU :(
// return this.model.findAll({
//   where: { inProgress: false },
//   group: 'home_team_id',
//   include: [{ model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } }],
//   attributes: [
//     [Sequelize.fn('COUNT', Sequelize.col('home_team_id')), 'totalGames'],
//     // [Sequelize.fn('COUNT', Sequelize.col('home_team_goals')), 'totalVictories'], // IMPLEMENTAR LOGICA DE CONTAR VITORIAS
//     // [Sequelize.fn('COUNT', Sequelize.col('home_team_goals')), 'totalDraws'], // IMPLEMENTAR LOGICA DE CONTAR EMPATES
//     // [Sequelize.fn('COUNT', Sequelize.col('home_team_goals')), 'totalLosses'], // IMPLEMENTAR LOGICA DE CONTAR DERROTAS
//     [Sequelize.fn('SUM', Sequelize.col('home_team_goals')), 'goalsFavor'],
//     [Sequelize.fn('SUM', Sequelize.col('away_team_goals')), 'goalsOwn'],
//   ],
// })
