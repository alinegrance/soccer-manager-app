import Team from '../database/models/TeamModel';

export default class TeamsService {
  public static async getAll(): Promise<Team[]> {
    const teams = await Team.findAll();
    return teams;
  }

  public static async getById(teamId: number): Promise<Team | null> {
    const team = await Team.findByPk(teamId);
    return team;
  }
}
