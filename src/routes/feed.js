const express = require('express');
const feedService = require('../services/feed');

const router = express.Router();

// Get all feed items
router.get('/', (req, res, next) => {

  feedService
    .getGlobalFeed(req.app.get('db'))
    .then((items) => {

      res.status(200).json(items);
    })
    .catch(next);
});

// Get a user's feed items
router.get('/:username', (req, res, next) => {

  feedService
    .getUserFeed(req.app.get('db'), req.params.username)
    .then((items) => {

      res.status(200).json(items);
    })
    .catch(next);
});

module.exports = router;
