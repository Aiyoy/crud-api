process.env.NODE_ENV = 'test';

import chai from 'chai';
import chaiHttp from 'chai-http';

import { server } from '../../dist/server';

import source from '../data/data.json';
import testSource from '../test/data-test.json';

const should = chai.should();

chai.use(chaiHttp);

describe('Users API', () => {
  const successCode = 200;
  const deleteCode = 404;
  const usersNum = testSource.length;
  const testUserId = '7ddb8c10-c5f3-4099-ae21-d96643643b20';
  const testUsername = 'Username';
  const testAge = 24;
  const testHobbies= ["hobby1", "hobby2"];

  const user = {
      username: 'Test User',
      age: 12,
      hobbies: ['art'],
    };

  const updateUser = {
      username: 'Ульфрик Новый',
      age: 24,
      hobbies: ['art'],
    };

  describe('/GET users', () => {
    it('it should GET all users', done => {
      chai.request(server)
        .get('/api/users')
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('array');
          done();
        });
    });
  });

  describe('/POST user', () => {
    it('it should POST an user ', done => {
      chai.request(server)
        .post('/api/users')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.should.have.property('username');
          res.body.should.have.property('age');
          res.body.should.have.property('hobbies');
          res.body.should.have.property('id');
          done();
        });
    });
  });

  describe('/GET/:id user', () => {
    it('it should GET an user by the given id', done => {
      chai.request(server)
        .get(`/api/users/${testUserId}`)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(testUserId);
          res.body.should.have.property('age').eql(testAge);
          res.body.should.have.property('hobbies').eql(testHobbies);
          res.body.should.have.property('username').eql(testUsername);
          done();
        });
    });
  });

  describe('/PUT/:id user', () => {
    it('it should UPDATE an user given the id', done => {
      chai.request(server)
        .put(`/api/users/${testUserId}`)
        .send(updateUser)
        .end((err, res) => {
          res.should.have.status(successCode);
          res.body.should.be.a('object');
          res.body.should.have.property('id').eql(testUserId);
          res.body.should.have.property('username').eql(updateUser.username);
          res.body.should.have.property('age').eql(updateUser.age);
          res.body.should.have.property('hobbies').eql(updateUser.hobbies);
          done();
        });
    });
  });

  describe('/DELETE/:id user', () => {
    it('it should DELETE an user given the id', done => {
      chai.request(server)
        .delete(`/api/products/${testUserId}`)
        .end((err, res) => {
          res.should.have.status(deleteCode);
          res.body.should.be.a('object');
          res.body.should.have.property('message').eql(`Route Not Found`);
          done();
        });
    });
  });
});
