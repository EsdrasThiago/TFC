import Team from "../models/TeamModel";
import ITeam from "./ITeam";

export default interface IServiceTeam {
  findAll(): Promise<Team[]>;
  findById(id: number): Promise<Team>;
}