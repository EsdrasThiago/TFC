// import ILeaderboard from './ILeaderboard';

export default interface IServiceLeaderboard {
  findAll(): Promise<object[] | undefined>;
}
