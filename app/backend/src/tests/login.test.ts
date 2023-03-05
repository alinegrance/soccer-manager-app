import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
import { userLogin } from './mocks';


import createToken from '../utils/jwt'

chai.use(chaiHttp);
const { expect } = chai;

describe('Test teams', () => {
  let chaiHttpResponse: Response;

  afterEach(()=>{
    sinon.restore();
  })

  it('tests if endpoint "/login" return token for valid email and password', async () => {
    sinon.stub(User, "findOne").resolves(userLogin as User);
    
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
      password: "secret_admin"
    });

    expect(chaiHttpResponse.status).to.be.deep.equal(200);
  });

});
