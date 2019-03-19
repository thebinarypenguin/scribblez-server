const jwt = require('jsonwebtoken');

const createToken = function (payload, secret, options={}) {

  return new Promise(function (resolve, reject) {

    jwt.sign(payload, secret, options, (err, token) => {

      if (err) {
        return reject(err);
      }

      resolve(token);
    });
  });
};

const verifyToken = function (token, secret, options={}) {

  return new Promise(function (resolve, reject) {

    jwt.verify(token, secret, options, (err, decoded) => {

      if (err) {
        return reject(err);
      }

      resolve(decoded);
    });
  });
};

module.exports = {
  createToken,
  verifyToken,
};
