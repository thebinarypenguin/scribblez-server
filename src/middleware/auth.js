const configService = require('../services/config');
const usersService  = require('../services/users');
const tokenService  = require('../services/token');

const requireAuth = function (req, res, next) {

  const authorization = req.get('Authorization');

  // If no Authorization header
  if (!authorization) {
    return res.status(401).json({ error: 'authorization not provided' });
  }

  const token = authorization.slice(7);

  // Validate token
  tokenService
    .verifyToken(token, configService.token_secret)
    .then((payload) => {

      return usersService
        .getUserByUsername(req.app.get('db'), payload.username)
        .then((user) => {
          req.user = user;
          next();
        });
    })
    .catch((err) => {
      return res.status(401).json({ error: 'invalid authorization' });
    });
};

const checkAuth = function (req, res, next) {

  const authorization = req.get('Authorization');

  // If no Authorization header
  if (!authorization) {
    next();
    return;
  }

  const token = authorization.slice(7);

  // Validate token
  tokenService
    .verifyToken(token, configService.token_secret)
    .then((payload) => {

      return usersService
        .getUserById(req.app.get('db'), payload.userId)
        .then((user) => {
          req.user = user;
          next();
        });
    })
    .catch((err) => {
      return res.status(401).json({ error: 'invalid authorization' });
    });
};

const matchingUserAuth = function (req, res, next) {

  const authorization = req.get('Authorization');

  // If no Authorization header
  if (!authorization) {
    return res.status(401).json({ error: 'authorization not provided' });
  }

  const token = authorization.slice(7);

  // Validate token
  tokenService
    .verifyToken(token, configService.token_secret)
    .then((payload) => {

      return usersService
        .getUserById(req.app.get('db'), payload.userId)
        .then((user) => {

          if (user.username !== req.params.username) {
            return res.status(401).json({ error: 'invalid authorization' });
          }

          req.user = user;
          next();
        });
    })
    .catch((err) => {
      return res.status(401).json({ error: 'invalid authorization' });
    });
};

module.exports = {
  requireAuth,
  checkAuth,
  matchingUserAuth,
};
