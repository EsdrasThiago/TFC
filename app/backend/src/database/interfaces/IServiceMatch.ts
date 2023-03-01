import Match from '../models/MatchModel';

export default interface IServiceMatch {
  findAll(): Promise<Match[]>;
  findByInProgress(status: boolean): Promise<Match[]>;
  finishMatch(id: number): Promise<[affectedCount: number]>;
}
