const bcrypt = require('bcryptjs');

const getUserById = function (db, userId) {

  return db
    .select('id', 'real_name', 'username', 'email_address')
    .from('users')
    .where('id', userId)
    .then((rows) => {
      return rows[0];
    });
};

const getUserByUsername = function (db, username) {

  return db
    .select('id', 'real_name', 'username', 'email_address')
    .from('users')
    .where('username', username)
    .then((rows) => {
      return rows[0];
    });
};

const createUser = function (db, createPayload) {

  // FIXME
  const test = {
    real_name: createPayload.real_name,
    email_address: 'a@b.c',
    username: createPayload.username,
    password_hash: '$2a$10$rwr7dpsiMVg6YfJy5a/TX.FqLra/Mci2wMsHnsz23G5VoS798e9Ty',
  };

  return db
    .insert(test)
    .into('users')
    .returning('id')
    .then((ids) => {
      return ids[0];
    });
};

const updateUser = function (db, userId, updatePayload) {

  return db('users')
    .update(updatePayload)
    .where('id', userId);
};

const replaceUser = function (db, userId, replacePayload) {

  return db('users')
    .update(replacePayload)
    .where('id', userId);
};

const deleteUser = function (db, userId) {

  return db
    .delete()
    .from('users')
    .where('id', userId);
};

const validateCredentials = function (db, username, password) {

  return db
    .select('*')
    .from('users')
    .where('username', username)
    .then((rows) => {

      if (rows.length === 0) {
        throw new Error('Invalid username or password');
      }

      return rows[0];
    })
    .then((user) => {

      return bcrypt
        .compare(password, user.password_hash)
        .then(() => {
          return user;
        })
        .catch(() => {
          throw new Error('Invalid username or password');
        });
    })
    .then((user) => {

      // redact sensitive info
      return {
        id            : user.id,
        real_name     : user.real_name,
        username      : user.username,
        email_address : user.email_address,
      };
    });
};

module.exports = {
  getUserById,
  getUserByUsername,
  createUser,
  updateUser,
  replaceUser,
  deleteUser,
  validateCredentials,
};
