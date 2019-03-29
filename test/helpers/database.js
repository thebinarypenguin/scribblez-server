
const insertTestData = function (db) {

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
};

const deleteTestData = function (db) {

  return db('users').delete().then(() => {

    return db('notes').delete();
  });
};

module.exports = {
  insertTestData,
  deleteTestData,
};
