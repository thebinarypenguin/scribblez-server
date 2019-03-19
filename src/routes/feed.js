const express = require('express');

const router = express.Router();

router.all('*', checkAuth);

// Get all feed items
router.get('/', (req, res) => {

  res.status(501).json();
});

// Get a user's feed items
router.get('/:username', (req, res) => {

  res.status(501).json();
});
