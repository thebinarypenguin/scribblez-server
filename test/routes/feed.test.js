const { expect } = require('chai');
const supertest  = require('supertest');
const knex       = require('knex');
const app        = require('../../src/app');
const config     = require('../../src/services/config');
const databaseHelpers = require('../helpers/database');

describe('Feed Routes', () => {

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

  describe('GET /feed', () => {

    it('should respond with a list of all public notes (200)', () => {

      return supertest(app)
        .get('/feed')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {

          response.body.forEach((f) => {
            expect(f.visibility).to.equal('public');
          });
        });
    });
  });

  describe('GET /feed/:username', () => {

    it('should respond with a list of public notes owned by :username (200)', () => {

      return supertest(app)
        .get('/feed/tuser')
        .expect('Content-Type', /json/)
        .expect(200)
        .then((response) => {

          response.body.forEach((f) => {
            expect(f.visibility).to.equal('public');
            expect(f.owner).to.equal('tuser');
          });
        });
    });
  });
});
