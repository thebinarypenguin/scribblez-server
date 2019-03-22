const express     = require('express');
const morgan      = require('morgan');
const cors        = require('cors');
const helmet      = require('helmet');
const config      = require('./services/config');
const authRouter  = require('./routes/auth');
const feedRouter  = require('./routes/feed');
const notesRouter = require('./routes/notes');
const usersRouter = require('./routes/users');

const app = express();

app.use(morgan('dev'));
app.use(cors({ origin: config.client_origin }));
app.use(helmet());

app.use((err, req, res, next) => {

  if (config.node_env === 'development') {
    console.log(err);
  }

  res.status(500).json(err);
});

app.use('/auth',  authRouter);
app.use('/feed',  feedRouter);
app.use('/notes', notesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hi There');
});

module.exports = app;
