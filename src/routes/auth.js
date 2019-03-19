const express = require('express');
const { requireAuth } = require('../middleware/auth');
const tokenService = require('../services/token');
const configService = require('../services/config');
const usersService  = require('../services/users');

const router = express.Router();

// Exchange username,password for a token
router.post('/login', express.json(), (req, res) => {

  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'username not provided' });
  }

  if (!password) {
    return res.status(400).json({ error: 'password not provided' });
  }

  // validate credentials
  usersService
    .validateCredentials(req.app.get('db'), username, password)
    .then((user) => {

      return tokenService
        .createToken(
          { userId: user.id },
          configService.jwt_secret,
          { expiresIn: configService.jwt_expiry }
        );
    })
    .then((token) => {
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      res.status(500).json({ error: 'error creating token' });
    });
});

// Exchange a stale token for a fresh token
router.get('/refresh', requireAuth, (req, res) => {

  return tokenService
    .createToken(
      { userId: req.user.id },
      configService.jwt_secret,
      { expiresIn: configService.jwt_expiry }
    )
    .then((token) => {
      res.status(200).json({ token: token });
    })
    .catch((err) => {
      res.status(500).json({ error: 'error creating token' });
    });
});

module.exports = router;
