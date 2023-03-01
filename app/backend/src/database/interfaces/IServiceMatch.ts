import Match from '../models/MatchModel';

export default interface IServiceMatch {
  findAll(status: boolean): Promise<Match[]>;
}
