const auth = require('./controller');

module.exports = [
  {
    method: 'POST',
    route: '/',
    handlers: [auth.authUser]
  }
];

module.exports.baseUrl = '/auth';
