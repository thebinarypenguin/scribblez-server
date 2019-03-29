const { expect } = require('chai');
const supertest  = require('supertest');
const knex       = require('knex');
const app        = require('../../src/app');
const config     = require('../../src/services/config');
const tokenService    = require('../../src/services/token');

describe('Users Routes', () => {

  let token = null;

  const db = knex({
    client: 'pg',
    connection: config.test_db_url,
  });

  before(() => {
    app.set('db', db);

    return tokenService
      .createToken(
        { username: 'tuser' },
        config.token_secret,
        { expiresIn: config.token_expiry }
      ).then((t) => {
        token = t;
      });
  });

  after(() => {
    return db.destroy();
  });

  describe('POST /users', () => {

    context('with invalid body', () => {

      it('should respond with an error (400)', () => {

        return supertest(app)
          .post('/users')
          .send({ foo: 'bar' })
          .expect('Content-Type', /json/)
          .expect(400);
      });
    });

    context('with valid body', () => {

      it('should respond with an empty body (201)', () => {

        return supertest(app)
          .post('/users')
          .send({ real_name: 'bob', email_address: 'a@b.c', username: 'bob', password: 'bob' })
          .expect('Content-Type', /json/)
          .expect(201);
      });
    });
  });

  describe('GET /users/:username', () => {

    context('with invalid Authorization', () => {

      it('should respond with an error (401)', () => {

        const badAuth = 'Bearer foobar';

        return supertest(app)
          .get('/users/bob')
          .set('Authorization', badAuth)
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });

    context('with invalid username', () => {

      it('should respond with an error (400)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .get('/users/foobar')
          .set('Authorization', goodAuth)
          .expect('Content-Type', /json/)
          .expect(400);
      });
    });

    context('with valid Authorization and username', () => {

      it('should respond with the user specified by username', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .get('/users/tuser')
          .set('Authorization', goodAuth)
          .expect('Content-Type', /json/)
          .send({ real_name: 'bob', email_address: 'a@b.c', username: 'bob', password: 'bob' })
          .expect(200)
          .then((response) => {

            expect(response.body).to.be.an('object');
            expect(response.body.username).to.be.equal('tuser');

          });
      });
    });
  });

});
