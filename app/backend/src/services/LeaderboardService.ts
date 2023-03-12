import Leaderboard from '../entities/Leaderboard';
import TeamStatistics from '../entities/TeamStatistics';
import MatchEntity from '../entities/MatchEntity';

export default class LeaderboardService {
  private _matches:MatchEntity[];

  public constructor(matches:MatchEntity[]) {
    this._matches = matches;
  }

  private static _updateHomeTeamStatistics(leaderboard:Leaderboard, match:MatchEntity):Leaderboard {
    const { homeTeam: { teamName: homeTeamName }, homeTeamGoals, awayTeamGoals } = match;

    const teamStatistics = leaderboard.getTeamStatisticsOrDefault(homeTeamName);

    teamStatistics.update(homeTeamGoals, awayTeamGoals);

    return leaderboard;
  }

  public home():TeamStatistics[] {
    const leaderboard = this._matches
      .reduce(LeaderboardService._updateHomeTeamStatistics, new Leaderboard());

    return leaderboard.getAllTeamsStatistics();
  }

  public static order(teamsStatistics: TeamStatistics[]) {
    return teamsStatistics.sort((a:TeamStatistics, b:TeamStatistics):number => {
      const comparisons:number[] = [
        b.totalPoints - a.totalPoints,
        b.totalVictories - a.totalVictories,
        b.goalsBalance - a.goalsBalance,
        b.goalsFavor - a.goalsFavor,
        a.goalsOwn - b.goalsOwn,
      ];

      return comparisons.find((comparison) => comparison !== 0) || 0;
    });
  }
}
