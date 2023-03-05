import { Request, Response } from 'express';
import TeamsService from '../services/TeamsService';

export default class TeamsController {
  public static async getAll(_req: Request, res: Response) {
    const teams = await TeamsService.getAll();
    res.status(200).send(teams);
  }

  public static async getById(req: Request, res: Response) {
    const { id: teamId } = req.params;
    const team = await TeamsService.getById(Number(teamId));
    if (!team) {
      return res.status(404).send({ message: 'Team not found' });
    }
    res.status(200).send(team);
  }
}
