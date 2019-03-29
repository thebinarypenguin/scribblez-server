const { expect } = require('chai');
const supertest  = require('supertest');
const knex       = require('knex');
const app        = require('../../src/app');
const config     = require('../../src/services/config');
const tokenService = require('../../src/services/token');

describe('Authorization Routes', () => {

  const db = knex({
    client: 'pg',
    connection: config.test_db_url,
  });

  before(() => {
    app.set('db', db);
  });

  after(() => {
    return db.destroy();
  });

  describe('POST /auth/login', () => {

    context('with invalid credentials', () => {

      it('should respond with an error (400)', () => {

        const badCredentials = {
          username: 'bad',
          password: 'bad',
        };

        return supertest(app)
          .post('/auth/login')
          .send(badCredentials)
          .expect('Content-Type', /json/)
          .expect(400);
      });
    });

    context('with valid credentials', () => {

      it('should respond with a JWT (200)', () => {

        const goodCredentials = {
          username: 'tuser',
          password: 'password',
        };

        return supertest(app)
          .post('/auth/login')
          .send(goodCredentials)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.token).to.be.an('string');
          });
      });
    });
  });

  describe('GET /auth/refresh', () => {

    context('with invalid Authorization', () => {

      it('should respond with an error (401)', () => {

        const badAuth = 'Bearer foobar';

        return supertest(app)
          .get('/auth/refresh')
          .set('Authorization', badAuth)
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });

    context('with valid Authorization', () => {

      let token = null;

      before(() => {

        return tokenService
          .createToken(
            { username: 'tuser' },
            config.token_secret,
            { expiresIn: config.token_expiry }
          ).then((t) => {
            token = t;
          });
      });

      it('should respond with a JWT (200)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .get('/auth/refresh')
          .set('Authorization', goodAuth)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.token).to.be.an('string');
          });
      });
    });
  });
});
