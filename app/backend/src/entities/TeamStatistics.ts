export default class TeamStatistics {
  private _teamName:string;
  private _totalGames:number;
  private _totalVictories:number;
  private _totalLosses:number;
  private _totalDraws:number;
  private _goalsFavor:number;
  private _goalsOwn:number;
  private _goalsBalance:number;
  private _totalPoints:number;
  private _efficiency:number;

  public constructor(teamName:string) {
    this._teamName = teamName;
    this._totalGames = 0;
    this._totalVictories = 0;
    this._totalLosses = 0;
    this._totalDraws = 0;
    this._goalsFavor = 0;
    this._goalsOwn = 0;
    this._goalsBalance = 0;
    this._totalPoints = 0;
    this._efficiency = 0;
  }

  private static _matchResult(goalsFavor:number, goalsOwn:number):string {
    const diffGoals = goalsFavor - goalsOwn;

    let result:string;

    if (diffGoals > 0) {
      result = 'win';
    } else if (diffGoals < 0) {
      result = 'lose';
    } else {
      result = 'draw';
    }

    return result;
  }

  private _updateStatistics(goalsFavor:number, goalsOwn:number) {
    this._totalGames += 1;
    this._goalsFavor += goalsFavor;
    this._goalsOwn += goalsOwn;
    this._goalsBalance = this._goalsFavor - this._goalsOwn;
    this._totalPoints = 3 * this._totalVictories + this._totalDraws;
    this._efficiency = Number(((this._totalPoints / (3 * this._totalGames)) * 100).toFixed(2));
  }

  public update(goalsFavor:number, goalsOwn:number) {
    const result = TeamStatistics._matchResult(goalsFavor, goalsOwn);

    switch (result) {
      case 'win':
        this._totalVictories += 1;
        break;
      case 'lose':
        this._totalLosses += 1;
        break;
      default:
        this._totalDraws += 1;
        break;
    }

    this._updateStatistics(goalsFavor, goalsOwn);
  }

  public get teamName() {
    return this._teamName;
  }

  public get totalPoints() {
    return this._totalPoints;
  }

  public get totalGames() {
    return this._totalGames;
  }

  public get totalVictories() {
    return this._totalVictories;
  }

  public get totalDraws() {
    return this._totalDraws;
  }

  public get totalLosses() {
    return this._totalLosses;
  }

  public get goalsFavor() {
    return this._goalsFavor;
  }

  public get goalsOwn() {
    return this._goalsOwn;
  }
}
