const { expect } = require('chai');
const supertest  = require('supertest');
const knex       = require('knex');
const app        = require('../../src/app');
const config     = require('../../src/services/config');
const tokenService    = require('../../src/services/token');

describe('Notes Routes', () => {

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

  describe('GET /notes', () => {

    context('with invalid Authorization', () => {

      it('should respond with an error (401)', () => {

        const badAuth = 'Bearer foobar';

        return supertest(app)
          .get('/notes')
          .set('Authorization', badAuth)
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });

    context('with valid Authorization', () => {

      it('should respond with all notes owned by authorized user', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .get('/notes')
          .set('Authorization', goodAuth)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {

            expect(response.body).to.be.an('array');

            response.body.forEach((n) => {
              expect(n.owner).to.equal('tuser');
            });
          });
      });
    });
  });

  describe('POST /notes', () => {

    context('with invalid Authorization', () => {

      it('should respond with an error (401)', () => {

        const badAuth = 'Bearer foobar';

        return supertest(app)
          .post('/notes')
          .set('Authorization', badAuth)
          .send({ body: 'xxx', visibility: 'xxx' })
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });

    context('with invalid body', () => {

      it('should respond with an error (400)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .post('/notes')
          .set('Authorization', goodAuth)
          .send({ foo: 'bar' })
          .expect('Content-Type', /json/)
          .expect(400);
      });
    });

    context('with valid Authorization and body', () => {

      it('should respond with an empty body (201)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .post('/notes')
          .set('Authorization', goodAuth)
          .send({ body: 'hello', visibility: 'private' })
          .expect('Content-Type', /json/)
          .expect(201);
      });
    });
  });

  describe('GET /notes/:noteId', () => {

    context('with invalid Authorization', () => {

      it('should respond with an error (401)', () => {

        const badAuth = 'Bearer foobar';

        return supertest(app)
          .get('/notes/1')
          .set('Authorization', badAuth)
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });

    context('with invalid noteId', () => {

      it('should respond with an error (400)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .get('/notes/foobar')
          .set('Authorization', goodAuth)
          .expect('Content-Type', /json/)
          .expect(400);
      });
    });

    context('with valid Authorization and noteId', () => {

      it('should respond with the note specified by noteId', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .get('/notes/1')
          .set('Authorization', goodAuth)
          .expect('Content-Type', /json/)
          .expect(200)
          .then((response) => {

            expect(response.body).to.be.an('object');
            expect(response.body.owner).to.be.equal('tuser');

          });
      });
    });
  });

  describe('PATCH /notes/:noteId', () => {

    context('with invalid Authorization', () => {

      it('should respond with an error (401)', () => {

        const badAuth = 'Bearer foobar';

        return supertest(app)
          .patch('/notes/1')
          .set('Authorization', badAuth)
          .send({ body: 'aaa', visibility: 'bbb' })
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });

    context('with invalid noteId', () => {

      it('should respond with an error (400)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .patch('/notes/foobar')
          .set('Authorization', goodAuth)
          .send({ body: 'aaa', visibility: 'bbb' })
          .expect('Content-Type', /json/)
          .expect(400);
      });
    });

    context('with invalid body', () => {

      it('should respond with an error (400)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .patch('/notes/1')
          .set('Authorization', goodAuth)
          .send({ foo: 'bar' })
          .expect('Content-Type', /json/)
          .expect(400);
      });
    });

    context('with valid Authorization, noteId, and body', () => {

      it('should respond with an empty body (204)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .patch('/notes/1')
          .set('Authorization', goodAuth)
          .send({ body: 'aaa', visibility: 'private' })
          .expect(204);
      });
    });
  });

  describe('DELET /notes/:noteId', () => {

    context('with invalid Authorization', () => {

      it('should respond with an error (401)', () => {

        const badAuth = 'Bearer foobar';

        return supertest(app)
          .delete('/notes/1')
          .set('Authorization', badAuth)
          .expect('Content-Type', /json/)
          .expect(401);
      });
    });

    context('with invalid noteId', () => {

      it('should respond with an error (400)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .delete('/notes/foobar')
          .set('Authorization', goodAuth)
          .expect('Content-Type', /json/)
          .expect(400);
      });
    });

    context('with valid Authorization and noteId', () => {

      it('should respond with an empty body (204)', () => {

        const goodAuth = 'Bearer ' + token;

        return supertest(app)
          .delete('/notes/1')
          .set('Authorization', goodAuth)
          .expect(204);
      });
    });
  });
});
