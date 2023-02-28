import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import TeamModel from '../database/models/TeamModel';
import { Model } from 'sequelize';
import TeamServices from '../database/services/TeamServices';
import { app } from '../app';

chai.use(chaiHttp);

const outputMock: TeamModel[] = [new TeamModel({
  id: 1,
  teamName: 'Vasco da gama',
})]

describe('Testes do findAll Teams', () => {
  beforeEach(() => {
    sinon.stub(Model, 'findAll').resolves(outputMock);
  })

  afterEach(() => {
    (TeamModel.findAll as sinon.SinonStub).restore();
  })


  it('Testa se "findAll" da service retorna todos os times', async () => {

    const service = new TeamServices();
    const result = await service.findAll();

    chai.expect(result).to.be.equal(outputMock)
  })

  it('Testa se "findAll" da controller retorna todos os times', async () => {

    const result = await chai.request(app).get('/teams')

    chai.expect(result.status).to.equal(200);
    chai.expect(result.body[0]).to.contain({
      id: 1,
      teamName: 'Vasco da gama',
    });
  })
});

describe('Testes do findById Teams', () => {
  beforeEach(() => {
    sinon.stub(Model, 'findOne').resolves(outputMock[0]);
  })

  afterEach(() => {
    (TeamModel.findOne as sinon.SinonStub).restore();
  })

  it('Testa se "findById" da service retorna todos os times', async () => {

    const service = new TeamServices();
    const result = await service.findById(1);

    chai.expect(result).to.be.equal(outputMock[0])
  })

  it('Testa se "findById" da controller retorna todos os times', async () => {

    const result = await chai.request(app).get('/teams/:id')

    chai.expect(result.status).to.equal(200);
    chai.expect(result.body).to.be.deep.equal({
      id: 1,
      teamName: 'Vasco da gama',
    });
  })
})