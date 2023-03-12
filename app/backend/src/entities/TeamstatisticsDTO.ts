import TeamStatistics from './TeamStatistics';

export default class TeamStatisticsDTO {
  public name:string;
  public totalPoints:number;
  public totalGames:number;
  public totalVictories:number;
  public totalDraws:number;
  public totalLosses:number;
  public goalsFavor:number;
  public goalsOwn:number;

  constructor(teamStatistcs: TeamStatistics) {
    this.name = teamStatistcs.teamName;
    this.totalPoints = teamStatistcs.totalPoints;
    this.totalGames = teamStatistcs.totalGames;
    this.totalVictories = teamStatistcs.totalVictories;
    this.totalDraws = teamStatistcs.totalDraws;
    this.totalLosses = teamStatistcs.totalLosses;
    this.goalsFavor = teamStatistcs.goalsFavor;
    this.goalsOwn = teamStatistcs.goalsOwn;
  }
}
