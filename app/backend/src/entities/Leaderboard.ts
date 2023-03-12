import TeamStatistics from './TeamStatistics';

type Summaries = {
  [key: string]: TeamStatistics;
};

export default class Leaderboard {
  private _summaries: Summaries;

  constructor() {
    this._summaries = {};
  }

  public hasTeam(teamName: string): boolean {
    return teamName in this._summaries;
  }

  public getTeamStatisticsOrDefault(teamName: string): TeamStatistics {
    if (!this.hasTeam(teamName)) {
      this._summaries[teamName] = new TeamStatistics(teamName);
    }
    return this._summaries[teamName];
  }

  public getAllTeamsStatistics(): TeamStatistics[] {
    return Object.entries(this._summaries).map(([_, teamStatistics]) => teamStatistics);
  }
}
