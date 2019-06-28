const { verify } = require('jsonwebtoken');
const User = require('../models/users');
const config = require('../../config');
const { getToken } = require('../utils/auth');

module.exports.ensureUser = async function ensureUser(ctx, next) {
  const token = getToken(ctx);

  if (!token) {
    ctx.throw(401);
  }

  let decoded = null;
  try {
    decoded = verify(token, config.token);
  } catch (err) {
    ctx.throw(401);
  }

  ctx.state.user = await User.findById(decoded.id, '-senha');
  if (!ctx.state.user) {
    ctx.throw(401);
  }

  return next();
};
