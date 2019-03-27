const express = require('express');
const { requireAuth } = require('../middleware/auth');
const tokenService = require('../services/token');
const configService = require('../services/config');
const usersService  = require('../services/users');

const router = express.Router();

// Exchange username,password for a token
router.post('/login', express.json(), (req, res, next) => {

  const { username, password } = req.body;

  if (!username) {
    return res.status(400).json({ error: 'Username not provided' });
  }

  if (!password) {
    return res.status(400).json({ error: 'Password not provided' });
  }

  // validate credentials
  usersService
    .validateCredentials(req.app.get('db'), username, password)
    .then((user) => {

      return tokenService
        .createToken(
          { username: user.username },
          configService.token_secret,
          { expiresIn: configService.token_expiry }
        );
    })
    .then((token) => {
      res.status(200).json({ token: token });
    })
    .catch((err) => {

      if (err.message === 'Invalid username or password') {
        return res.status(400).json({ error:  'Invalid username or password' });
      }

      next(err);
    });
});

// Exchange a stale token for a fresh token
router.get('/refresh', requireAuth, (req, res, next) => {

  return tokenService
    .createToken(
      { username: req.user.username },
      configService.token_secret,
      { expiresIn: configService.token_expiry }
    )
    .then((token) => {
      res.status(200).json({ token: token });
    })
    .catch(next);
});

module.exports = router;
