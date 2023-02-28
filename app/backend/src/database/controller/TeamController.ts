import IServiceTeam from "../interfaces/IServiceTeam";
import { Request, Response } from "express";

class TeamController {
  private _team: IServiceTeam;

  constructor(service: IServiceTeam) {
    this._team = service;
  }

  async findAll(req: Request, res: Response) {
    const teams = await this._team.findAll();
    return res.status(200).json(teams);
  }

  async findById(req: Request, res: Response) {
    const { id } = req.params;
    const idToNumber = Number(id);
    const teamById = await this._team.findById(idToNumber);
    return res.status(200).json(teamById);
  }
}

export default TeamController;