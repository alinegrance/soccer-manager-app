import Team from '../database/models/TeamModel';
import Match from '../database/models/MatchModel';
import MatchEntity from '../entities/MatchEntity';

export default class MatchesService {
  public static async getAll():Promise<Match[] | MatchEntity[]> {
    const matches = await Match.findAll({
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matches;
  }

  public static async getAllInProgress(): Promise<Match[] | MatchEntity[]> {
    const matchesInProgress = await Match.findAll({
      where: { inProgress: true },
      include: [
        { model: Team, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: Team, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    return matchesInProgress;
  }

  public static async getAllFinished(): Promise<Match[] | MatchEntity[]> {
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

  public static async createMatch(match: Match) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = match;

    try {
      const newMatch = await Match
        .create({ homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true });
      return newMatch;
    } catch (e) {
      throw new Error('There is no team with such id!');
    }
  }
}
