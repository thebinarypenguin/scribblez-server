const morgan = require('morgan');
const config = require('../services/config');

let format = 'dev';
let noop = () => {};

switch (config.node_env) {

  case 'production':
    format = 'tiny';
    break;

  case 'test':
  case 'testing':
    format = noop;
    break;

  default:
    format = 'dev';
    break;
}

module.exports = morgan(format);
