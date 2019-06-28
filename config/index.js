require('dotenv').config();

const config = {
  port: process.env.PORT || 5000,
  session: process.env.SESSION || 'secret-boilerplate-token',
  token: process.env.SECRET_KEY || 'secret-jwt-token',
  database: process.env.DB_CONN || 'mongodb://localhost:27017/defalt',
  apiMaps: process.env.MAP_KEY || ''
};

module.exports = config;
