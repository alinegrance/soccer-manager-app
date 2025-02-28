import { Request, Response } from 'express';
import TeamStatisticsDTO from '../entities/TeamstatisticsDTO';
import MatchEntity from '../entities/MatchEntity';
import MatchesService from '../services/MatchesService';
import LeaderboardService from '../services/LeaderboardService';

export default class LeaderboardController {
  public static async getHomeLeaderboard(req: Request, res:Response) {
    const matches = await MatchesService.getAllFinished();
    const homeTeamsStatistics = new LeaderboardService(matches as MatchEntity[]).home();

    const orderedHomeTeamsStatistics = LeaderboardService.order(homeTeamsStatistics);

    res.status(200)
      .send(orderedHomeTeamsStatistics
        .map((teamStatistics) => new TeamStatisticsDTO(teamStatistics)));
  }

  public static async getAwayLeaderboard(req: Request, res:Response) {
    const matches = await MatchesService.getAllFinished();
    const awayTeamsStatistics = new LeaderboardService(matches as MatchEntity[]).away();

    const orderedAwayTeamsStatistics = LeaderboardService.order(awayTeamsStatistics);

    res.status(200)
      .send(orderedAwayTeamsStatistics
        .map((teamStatistics) => new TeamStatisticsDTO(teamStatistics)));
  }
}
