const knex       = require('knex');
const config     = require('../src/services/config');

const db = knex({
  client: 'pg',
  connection: config.test_db_url,
});

before(() => {

  return db.delete().from('users').then(() => {
    return db.raw('ALTER SEQUENCE users_id_seq RESTART WITH 1').then(() => {
      return db.raw('ALTER SEQUENCE notes_id_seq RESTART WITH 1').then(() => {

        return db('users')
          .insert({
            real_name: 'Test User',
            email_address: 'foo@bar.com',
            username: 'tuser',
            password_hash: '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty',
          })
          .returning('id')
          .then((ids) => {

            const userId = ids[0];

            return db('notes')
              .insert([
                { owner_id: userId, body: 'Alpha',   visibility: 'public'  },
                { owner_id: userId, body: 'Bravo',   visibility: 'private' },
                { owner_id: userId, body: 'Charlie', visibility: 'public'  },
              ]);
          });
      });
    });
  });
});

after(() => {

  return db.delete().from('users').then(() => {
    return db.destroy();
  });
});
