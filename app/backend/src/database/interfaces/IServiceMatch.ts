import Match from '../models/MatchModel';
import IGoals from './IGoals';
import IMatch from './IMatch';

export default interface IServiceMatch {
  findAll(): Promise<Match[]>;
  findByInProgress(status: boolean): Promise<Match[]>;
  finishMatch(id: number): Promise<[affectedCount: number]>;
  editMatch(id: number, data: IGoals): Promise<[affectedCount: number]>;
  newMatch(data: IMatch): Promise<Match | string>;
}
