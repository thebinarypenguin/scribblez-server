const express = require('express');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.all('*', requireAuth);

// Get all users
router.get('/', (req, res) => {

  res.status(501).json();
});

// Create new user
router.post('/', express.json(), (req, res) => {

  res.status(501).json();
});

// Get existing user
router.get('/:username', (req, res) => {

  res.status(501).json();
});

// Update existing user
router.patch('/:username', express.json(), (req, res) => {

  res.status(501).json();
});

// Replace exiting user
router.put('/:username', express.json(), (req, res) => {

  res.status(501).json();
});

// Delete exiting user
router.delete('/:username', (req, res) => {

  res.status(501).json();
});

module.exports = router;
