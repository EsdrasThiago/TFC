import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import UserModel from '../database/models/UserModel';
import { Model } from 'sequelize';
import UserServices from '../database/services/UserServices';
// import { app } from '../app';

chai.use(chaiHttp);

const outputMock: UserModel[] = [new UserModel({
  email: 'admin@admin.com',
  password: 'secret_admin'
})]

describe('Testes do loginUser da User', () => {
  beforeEach(() => {
    sinon.stub(Model, 'findOne').resolves(outputMock[0]);
  })

  afterEach(() => {
    (UserModel.findOne as sinon.SinonStub).restore();
  })

  it('Testa se "loginUser" da service retorna usuario', async () => {

    const service = new UserServices();
    const result = await service.loginUser('admin@admin.com');

    chai.expect(result).to.be.equal(outputMock[0])
  })

  // it('Testa se "loginUser" da controller retorna token', async () => {

  //   const result = await chai.request(app).get('/login')

  //   chai.expect(result.status).to.equal(200);
  // })
});
