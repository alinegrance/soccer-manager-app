type MatchEntity = {
  id:number,
  homeTeamId:number,
  awayTeamId:number,
  homeTeam: { teamName:string },
  awayTeam: { teamName: string },
  homeTeamGoals:number,
  awayTeamGoals:number,
  inProgress:boolean
};

export default MatchEntity;
