import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import { Response } from 'superagent';
import User from '../database/models/UserModel';
import { userLogin, userRole } from './mocks';

import * as jwt from 'jsonwebtoken';

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

  it('tests if endpoint "/login" returns error message when entered invalid email type', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "emailinvalido",
      password: "senha"
    });

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('tests if endpoint "/login" returns error message when not passing password', async () => {
    chaiHttpResponse = await chai.request(app).post('/login').send({
      email: "admin@admin.com",
    });

    expect(chaiHttpResponse.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('tests if endpoint "/login/role" returns user role when token is valid', async () => {
    const jwtPayload =  {data: { user: { id: 1} }, iat: 1678053337, exp: 1678658137 }
    
    sinon.stub(jwt, "verify").callsFake((token, secret)=>{
      return jwtPayload;
    });
    
    sinon.stub(User, "findByPk").resolves(userLogin as User);

    chaiHttpResponse = await chai.request(app).get('/login/role').set('authorization', 'umtokenválidomuitolongoaqui');

    expect(chaiHttpResponse.body).to.be.deep.equal(userRole);


  })


});
