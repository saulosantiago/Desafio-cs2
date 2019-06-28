const passport = require('koa-passport');
const { Strategy } = require('passport-local');
const User = require('../src/models/users');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id, '-senha');
    done(null, user);
  } catch (err) {
    done(err);
  }
});

passport.use(
  'local',
  new Strategy(
    {
      usernameField: 'email',
      passwordField: 'senha'
    },
    async (email, password, done) => {
      try {
        const user = await User.findOne({ email });

        if (!user) {
          return done(null, false);
        }

        try {
          const isMatch = await user.validatePassword(password);
          if (!isMatch) {
            return done(null, false);
          }
          return done(user);
        } catch (err) {
          return done(err);
        }
      } catch (err) {
        return done(err);
      }
    }
  )
);
