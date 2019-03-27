const express = require('express');
const { requireAuth } = require('../middleware/auth');
const UsersService = require('../services/users');

const router = express.Router();

const verifyPermission = function (req, res, next) {

  if (req.user.username !== req.params.username) {
    return res.status(400).json({ error: 'Permission denied' });
  }

  next();
};

// Create new user
router.post('/', express.json(), (req, res) => {

  UsersService
    .createUser(req.app.get('db'), req.body)
    .then((id) => {
      res.status(201).json();
    });
});

// Get existing user
router.get('/:username', requireAuth, verifyPermission, (req, res) => {

  res.status(200).json(req.user);
});

// Update existing user
router.patch('/:username', requireAuth, verifyPermission, express.json(), (req, res) => {

  res.status(501).json();
});

// Delete exiting user
router.delete('/:username', requireAuth, verifyPermission, (req, res) => {

  res.status(501).json();
});

module.exports = router;
