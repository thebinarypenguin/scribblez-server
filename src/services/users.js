const bcrypt = require('bcryptjs');

const getUserByUsername = function (db, username) {

  // TODO validate username

  return db
    .select('id', 'real_name', 'username', 'email_address')
    .from('users')
    .where('username', username)
    .then((rows) => {
      return rows[0];
    });
};

const createUser = function (db, createPayload) {

  // TODO validate createPayload

  return bcrypt.hash(createPayload.password, 10)
    .then((hash) => {

      return {
        real_name     : createPayload.real_name,
        email_address : createPayload.email_address,
        username      : createPayload.username,
        password_hash : hash,
      };
    })
    .then((payload) => {

      return db
        .insert(payload)
        .into('users')
        .returning('id')
        .then((ids) => {
          return ids[0];
        });
    });
};

const updateUser = function (db, userId, updatePayload) {

  // TODO validate userId
  // TODO validate updatePayload

  return db('users')
    .update(updatePayload)
    .where('id', userId);
};

const deleteUser = function (db, userId) {

  // TODO validate userId

  return db
    .delete()
    .from('users')
    .where('id', userId);
};

const validateCredentials = function (db, username, password) {

  // TODO validate username
  // TODO validate password

  // Check if user exists
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

      // Compare passwords
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

      // Redact sensitive info
      return {
        real_name     : user.real_name,
        username      : user.username,
        email_address : user.email_address,
      };
    });
};

module.exports = {
  getUserByUsername,
  createUser,
  updateUser,
  deleteUser,
  validateCredentials,
};
