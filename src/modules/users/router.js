const { ensureUser } = require('../../middleware/validators');
const user = require('./controller');

module.exports.baseUrl = '/users';

module.exports = [
  {
    method: 'POST',
    route: '/users',
    handlers: [user.createUser]
  },
  {
    method: 'GET',
    route: '/users',
    handlers: [ensureUser, user.getUsers]
  },
  {
    method: 'GET',
    route: '/users/:id',
    handlers: [ensureUser, user.getUser]
  },
  {
    method: 'PUT',
    route: '/users/:id',
    handlers: [ensureUser, user.getUser, user.updateUser]
  },
  {
    method: 'DELETE',
    route: '/users/:id',
    handlers: [ensureUser, user.getUser, user.deleteUser]
  }
];
