const express = require('express');

const router = express.Router();

// Exchange username,password for a token
router.post('/login', express.json(), (req, res) => {

  res.status(501).json();
});

// Exchange a stale token for a fresh token
router.get(requireAuth, '/refresh', (req, res) => {

  res.status(501).json();
});
