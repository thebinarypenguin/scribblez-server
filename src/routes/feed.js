const express = require('express');
const { checkAuth } = require('../middleware/auth');
const feedService = require('../services/feed');

const router = express.Router();

router.all('*', checkAuth);

// Get all feed items
router.get('/', (req, res) => {

  feedService
    .getGlobalFeed(req.app.get('db'))
    .then((items) => {

      res.status(200).json(items);
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

// Get a user's feed items
router.get('/:username', (req, res) => {

  feedService
    .getUserFeed(req.app.get('db'), req.params.username)
    .then((items) => {

      res.status(200).json(items);
    })
    .catch((err) => {

      res.status(500).json(err);
    });
});

module.exports = router;
