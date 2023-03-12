import Leaderboard from '../entities/Leaderboard';
import TeamStatistics from '../entities/TeamStatistics';
import MatchEntity from '../entities/MatchEntity';

type TeamGoals = {
  teamName:string;
  goalsFavor:number;
  goalsOwn:number;
};

export default class LeaderboardService {
  private _matches:MatchEntity[];

  public constructor(matches:MatchEntity[]) {
    this._matches = matches;
  }

  private static _updateTeamStatistics(
    leaderboard:Leaderboard,
    match:MatchEntity,
    extractFn:(m:MatchEntity) => TeamGoals,
  ):Leaderboard {
    const { teamName, goalsFavor, goalsOwn } = extractFn(match);

    const teamStatistics = leaderboard.getTeamStatisticsOrDefault(teamName);

    teamStatistics.update(goalsFavor, goalsOwn);

    return leaderboard;
  }

  private _getTeamsStatistics(extractFn:(m:MatchEntity) => TeamGoals) {
    const leaderboard = this._matches
      .reduce((acc, m) =>
        LeaderboardService._updateTeamStatistics(acc, m, extractFn), new Leaderboard());

    return leaderboard.getAllTeamsStatistics();
  }

  public home():TeamStatistics[] {
    const extractHomeFn = (match:MatchEntity) =>
      ({ teamName: match.homeTeam.teamName,
        goalsFavor: match.homeTeamGoals,
        goalsOwn: match.awayTeamGoals });

    return this._getTeamsStatistics(extractHomeFn);
  }

  public away():TeamStatistics[] {
    const extractAwayFn = (match:MatchEntity) =>
      ({ teamName: match.awayTeam.teamName,
        goalsFavor: match.awayTeamGoals,
        goalsOwn: match.homeTeamGoals });

    return this._getTeamsStatistics(extractAwayFn);
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
