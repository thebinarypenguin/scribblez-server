const express      = require('express');
const cors         = require('cors');
const helmet       = require('helmet');
const config       = require('./services/config');
const logging      = require('./middleware/logging');
const errorHandler = require('./middleware/errorHandler');
const authRouter   = require('./routes/auth');
const feedRouter   = require('./routes/feed');
const notesRouter  = require('./routes/notes');
const usersRouter  = require('./routes/users');

const app = express();

app.use(errorHandler);
app.use(logging);
app.use(cors({ origin: config.client_origin }));
app.use(helmet());

app.use('/auth',  authRouter);
app.use('/feed',  feedRouter);
app.use('/notes', notesRouter);
app.use('/users', usersRouter);

app.get('/', (req, res) => {
  res.send('Hi There');
});

module.exports = app;
