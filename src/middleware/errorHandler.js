const config = require('../services/config');

const defaultErrorHandler = function (err, req, res, next) {

  if (config.node_env === 'development') {
    console.log(err);
  }

  res.status(500).json({ error: 'Internal server error' });
};

module.exports = defaultErrorHandler;
