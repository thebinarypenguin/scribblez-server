const app    = require('./app');
const config = require('./config');
const pkg    = require('../package.json');

app.listen(config.port, config.host, () => {
  console.log(`${pkg.name}@${pkg.version} running in ${config.node_env} mode at http://${config.host}:${config.port}`);
});
