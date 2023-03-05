import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import Team from '../database/models/TeamModel';
import { allTeams, teamIdOne } from './mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test teams', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('tests if endpoint "/teams" return all teams', async () => {
    sinon.stub(Team, "findAll").resolves(allTeams as Team[]);
    
    chaiHttpResponse = await chai.request(app).get('/teams');
    expect(chaiHttpResponse.body).to.be.deep.equal(allTeams);
  });

  it('tests id endpoint "/teams/:id" return right team with given id', async() => {
    sinon.stub(Team, "findByPk").resolves(teamIdOne as Team);

    chaiHttpResponse = await chai.request(app).get('/teams/1');
    expect(chaiHttpResponse.body).to.be.deep.equal(teamIdOne);
  });
});
