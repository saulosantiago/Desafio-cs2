const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const convert = require('koa-convert');
const logger = require('koa-logger');
const mongoose = require('mongoose');
const session = require('koa-generic-session');
const passport = require('koa-passport');
const mount = require('koa-mount');
const serve = require('koa-static');
const { errorMiddleware } = require('./src/middleware');

const config = require('./config');

const app = new Koa();
app.keys = [config.session];

mongoose.Promise = global.Promise;
mongoose.connect(config.database, { useNewUrlParser: true });

app.use(convert(logger()));
app.use(bodyParser());
app.use(session());
app.use(errorMiddleware());

app.use(convert(mount('/docs', serve(`${process.cwd()}/docs`))));

require('./config/passport');

app.use(passport.initialize());
app.use(passport.session());

const modules = require('./src/modules');

modules(app);

app.listen(config.port, () => {
  console.log(`Server started on ${config.port}`);
});
