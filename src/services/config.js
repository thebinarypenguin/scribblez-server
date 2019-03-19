const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  node_env     : process.env.NODE_ENV,
  host         : process.env.HOST,
  port         : process.env.PORT,
  db_string    : `postgres://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`,
  token_secret : process.env.TOKEN_SECRET,
  token_expiry : process.env.TOKEN_EXPIRY,
};
