import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
import * as jwt from 'jsonwebtoken';
import Match from '../database/models/MatchModel';
import { allMatches, finishedMatches, inProgressMatches, newMatch } from './mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  });

  it('Tests if endpoint get("/matches") returns all matches', async () => {
    sinon.stub(Match, 'findAll').resolves(allMatches as []);

    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
  });

  it('Tests if endpoint get("/matches?inProgress=true") returns all in progress matches', async () => {
    sinon.stub(Match, 'findAll').resolves(inProgressMatches as []);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(chaiHttpResponse.body).to.be.deep.equal(inProgressMatches);
  });

  it('Tests if endpoint get("/matches?inProgress=false") returns all finished matches', async () => {
    sinon.stub(Match, 'findAll').resolves(finishedMatches as []);

    chaiHttpResponse = await chai.request(app).get('/matches?inProgress=true');
    expect(chaiHttpResponse.body).to.be.deep.equal(finishedMatches);
  });

  it('Tests if endpoint patch("/matches/:id/finish)" returns message: "Finished"', async () => {
    const jwtPayload =  {data: { user: { id: 1} }, iat: 1678053337, exp: 1678658137 }
    
    sinon.stub(jwt, "verify").callsFake((token, secret)=>{
      return jwtPayload;
    });

    sinon.stub(Match, 'update').resolves([1]);

    chaiHttpResponse = await chai.request(app).patch('/matches/45/finish').set('authorization', 'umtokenválidomuitolongoaqui');
    expect(chaiHttpResponse.body).to.be.deep.equal({message: "Finished"});
  });

  it('Tests if endpoint patch("/matches/:id") returns updated scores"', async () => {
    const jwtPayload =  {data: { user: { id: 1} }, iat: 1678053337, exp: 1678658137 }
    
    sinon.stub(jwt, "verify").callsFake((token, secret)=>{
      return jwtPayload;
    });

    sinon.stub(Match, 'update').resolves([1]);

    chaiHttpResponse = await chai.request(app)
      .patch('/matches/45')
      .set('authorization', 'umtokenválidomuitolongoaqui')
      .send({
        "homeTeamGoals": 3,
        "awayTeamGoals": 1
      });

    expect(chaiHttpResponse.body).to.be.deep.equal({
      "homeTeamGoals": 3,
      "awayTeamGoals": 1
    });
  });

  it('Tests if endpoint post("/matches") returns updated scores"', async () => {
    const jwtPayload =  {data: { user: { id: 1} }, iat: 1678053337, exp: 1678658137 }
    
    sinon.stub(jwt, "verify").callsFake((token, secret)=>{
      return jwtPayload;
    });

    sinon.stub(Match, 'create').resolves(newMatch as Match);

    chaiHttpResponse = await chai.request(app)
      .post('/matches')
      .set('authorization', 'umtokenválidomuitolongoaqui')
      .send({
        "homeTeamId": 16,
        "awayTeamId": 8,
        "homeTeamGoals": 2,
        "awayTeamGoals": 2,
      });

    expect(chaiHttpResponse.body).to.be.deep.equal(newMatch);
  });
});