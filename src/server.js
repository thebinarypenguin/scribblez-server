const knex   = require('knex');
const app    = require('./app');
const config = require('./services/config');
const pkg    = require('../package.json');

const db = knex({
  client: 'pg',
  connection: config.db_string,
});

app.set('db', db);

app.listen(config.port, config.host, () => {
  console.log(`${pkg.name}@${pkg.version} running in ${config.node_env} mode at http://${config.host}:${config.port}`);
});
