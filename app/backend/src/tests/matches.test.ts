import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import Match from '../database/models/MatchModel';
import { Model } from 'sequelize';
import MatchService from '../database/services/MatchServices';
import { app } from '../app';
const service = new MatchService();

chai.use(chaiHttp);

const outputMock2: Match[] = [new Match({
  id: 50,
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 100,
  awayTeamGoals: 2,
  inProgress: true
})];

const fail = [{
  homeTeamId: 16,
  homeTeamGoals: 2,
  awayTeamId: 100,
  awayTeamGoals: 2,
  inProgress: true
}];

const outputMock: Match[] = [new Match({
    id: 1,
		homeTeamId: 16,
		homeTeamGoals: 1,
		awayTeamId: 8,
		awayTeamGoals: 1,
		inProgress: false,
		homeTeam: {
			teamName: "São Paulo"
		},
		awayTeam: {
			teamName: "Grêmio"
		}
})]

describe('Testes do findAll de Matches', () => {
  beforeEach(() => {
    sinon.stub(Model, 'findAll').resolves(outputMock);
  })

  afterEach(() => {
    (Match.findAll as sinon.SinonStub).restore();
  })

  it('Testa se "findAll" da service retorna times', async () => {

    const service = new MatchService();
    const result = await service.findAll()

    chai.expect(result).to.be.equal(outputMock)
  })
});

describe('Testes do newMatchs de Matches', () => {
  beforeEach(() => {
    sinon.stub(service, 'newMatch').resolves('There is no team with such id!');
  })

  afterEach(() => {
    (service.newMatch as sinon.SinonStub).restore();
  })

  it('Testa se "newMatchs" cria novo time', async () => {

    const service = new MatchService();
    const result = await service.newMatch(fail[0])

    chai.expect(result).to.be.equal('There is no team with such id!')
  })

});
