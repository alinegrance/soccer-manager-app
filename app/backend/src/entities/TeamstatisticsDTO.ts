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
  public goalsBalance:number;
  public efficiency:number;

  constructor(teamStatistics: TeamStatistics) {
    this.name = teamStatistics.teamName;
    this.totalPoints = teamStatistics.totalPoints;
    this.totalGames = teamStatistics.totalGames;
    this.totalVictories = teamStatistics.totalVictories;
    this.totalDraws = teamStatistics.totalDraws;
    this.totalLosses = teamStatistics.totalLosses;
    this.goalsFavor = teamStatistics.goalsFavor;
    this.goalsOwn = teamStatistics.goalsOwn;
    this.goalsBalance = teamStatistics.goalsBalance;
    this.efficiency = teamStatistics.efficiency;
  }
}
