import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserModel from '../database/models/UserModel';
import { Model } from 'sequelize';
import UserServices from '../database/services/UserServices';
import { app } from '../app';

chai.use(chaiHttp);

const outputMock: UserModel[] = [new UserModel({
  email: 'admin@admin.com',
  password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
})]

describe('Testes do loginUser Teams', () => {
  beforeEach(() => {
    sinon.stub(Model, 'create').resolves(outputMock[0]);
  })

  it('Testa se "loginUser" da controller retorna token', async () => {

    const result = await chai.request(app).get('/login')

    chai.expect(result.status).to.equal(200);
  })
});