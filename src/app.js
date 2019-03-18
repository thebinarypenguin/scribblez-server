const express = require('express');
const morgan  = require('morgan');
const cors    = require('cors');
const helmet  = require('helmet');
const config  = require('./config');

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

app.use((err, req, res, next) => {

  if (config.node_env === 'development') {
    console.log(err);
  }

  res.status(500).json(err);
});

app.get('/', (req, res) => {
  res.send('Hi There');
});

module.exports = app;
