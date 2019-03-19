const tokenService = require('../services/token');


const requireAuth = function (req, res, next) {

  const authorization = req.get('Authorization');

  // If no Authorization header
  if (!authorization) {
    return res.status(401).json({ error: 'authorization not provided' });
  }

  const token = authorization.slice(7);

  // Validate token
  tokenService
    .verifyToken(token, SECRET)
    .then((payload) => {
      req.tokenPayload = payload;
      next();
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
  }

  const token = authorization.slice(7);

  // Validate token
  tokenService
    .verifyToken(token, SECRET)
    .then((payload) => {
      req.tokenPayload = payload;
      next();
    })
    .catch((err) => {
      return res.status(401).json({ error: 'invalid authorization' });
    });
};

module.exports = {
  requireAuth,
  checkAuth,
};
