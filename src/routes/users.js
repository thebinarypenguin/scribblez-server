const express = require('express');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

const verifyPermission = function (req, res, next) {

  if (req.user.username !== req.params.username) {
    return res.status(400).json({ error: 'Permission denied' });
  }

  next();
};

router.all('*', requireAuth);

// // Get all users
// router.get('/', (req, res) => {

//   res.status(501).json();
// });

// Create new user
router.post('/', express.json(), (req, res) => {

  res.status(501).json();
});

// Get existing user
router.get('/:username', verifyPermission, (req, res) => {

  res.status(200).json(req.user);
});

// Update existing user
router.patch('/:username', verifyPermission, express.json(), (req, res) => {

  res.status(501).json();
});

// Replace exiting user
router.put('/:username', verifyPermission, express.json(), (req, res) => {

  res.status(501).json();
});

// Delete exiting user
router.delete('/:username', verifyPermission, (req, res) => {

  res.status(501).json();
});

module.exports = router;
