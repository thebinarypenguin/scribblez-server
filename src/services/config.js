const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  node_env      : process.env.NODE_ENV,
  host          : process.env.HOST,
  port          : process.env.PORT,
  db_url        : process.env.DATABASE_URL,
  test_db_url   : process.env.TEST_DATABASE_URL,
  token_secret  : process.env.TOKEN_SECRET,
  token_expiry  : process.env.TOKEN_EXPIRY,
  client_origin : process.env.CLIENT_ORIGIN,
};
