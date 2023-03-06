import { Request, Response } from 'express';
import MatchesService from '../services/MatchesService';

export default class MatchesController {
  public static async getAll(req: Request, res: Response) {
    const { inProgress } = req.query;

    console.log(inProgress);

    if (inProgress === undefined) {
      const matches = await MatchesService.getAll();
      return res.status(200).send(matches);
    }

    if (inProgress === 'true') {
      const matchesInProgress = await MatchesService.getAllInProgress();
      return res.status(200).send(matchesInProgress);
    }

    if (inProgress === 'false') {
      const matchesFinished = await MatchesService.getAllFinished();
      return res.status(200).send(matchesFinished);
    }
  }

  public static async finishMatch(req: Request, res: Response) {
    const { id } = req.params;
    await MatchesService.finishMatch(Number(id));
    res.status(200).send({ message: 'Finished' });
  }

  public static async updateMatch(req: Request, res: Response) {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchesService.updateMatch(Number(id), homeTeamGoals, awayTeamGoals);

    res.status(200).send('ok');
  }
}
