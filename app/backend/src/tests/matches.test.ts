import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { Response } from 'superagent';
// import * as jwt from 'jsonwebtoken';
import Match from '../database/models/MatchModel';
import IMatch from '../interfaces/IMatch';
import { allMatches } from './mocks';

chai.use(chaiHttp);
const { expect } = chai;

describe('Test matches', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  });

  it('Tests if endpoint "/matches" returns all matches', async () => {
    sinon.stub(Match, 'findAll').resolves(allMatches as []);

    chaiHttpResponse = await chai.request(app).get('/matches');
    expect(chaiHttpResponse.body).to.be.deep.equal(allMatches);
  });
});