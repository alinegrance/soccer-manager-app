import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';

export default class MatchesService {
  public static async getAll():Promise<Match[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matches;
  }

  public static async getAllInProgress(): Promise<Match[]> {
    const matchesInProgress = await Match.findAll({
      where: { inProgress: true },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matchesInProgress;
  }

  public static async getAllFinished(): Promise<Match[]> {
    const matchesFinished = await Match.findAll({
      where: { inProgress: false },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return matchesFinished;
  }

  public static async finishMatch(matchId: number) {
    const updated = await Match.update(
      { inProgress: false },
      { where: { id: matchId } },
    );
    return updated;
  }

  public static async updateMatch(matchId: number, homeTeamGoals: number, awayTeamGoals: number) {
    const updated = await Match.update(
      { homeTeamGoals, awayTeamGoals },
      { where: { id: matchId } },
    );
    return updated;
  }
}
