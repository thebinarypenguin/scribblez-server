const express = require('express');
const { matchingUserAuth } = require('../middleware/auth');

const router = express.Router();

// router.all('*', requireAuth);

// Get all users
router.get('/', (req, res) => {

  res.status(501).json();
});

// Create new user
router.post('/', express.json(), (req, res) => {

  res.status(501).json();
});

// Get existing user
router.get('/:username', matchingUserAuth, (req, res) => {

  res.status(200).json(req.user);
});

// Update existing user
router.patch('/:username', matchingUserAuth, express.json(), (req, res) => {

  res.status(501).json();
});

// Replace exiting user
router.put('/:username', matchingUserAuth, express.json(), (req, res) => {

  res.status(501).json();
});

// Delete exiting user
router.delete('/:username', matchingUserAuth, (req, res) => {

  res.status(501).json();
});

module.exports = router;
