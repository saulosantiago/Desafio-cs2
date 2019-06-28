/* eslint-disable no-return-await */
/* eslint-disable func-names */
/* eslint-disable import/no-dynamic-require */
/* eslint-disable global-require */

const glob = require('glob');
const Router = require('koa-router');

module.exports = function initModules(app) {
  glob(`${__dirname}/*`, { ignore: '**/index.js' }, (err, matches) => {
    if (err) {
      throw err;
    }

    matches.forEach(mod => {
      const router = require(`${mod}/router`);

      const routes = router;
      const { baseUrl } = router;
      const instance = new Router({ prefix: baseUrl });

      routes.forEach(config => {
        const { method = '', route = '', handlers = [] } = config;

        const lastHandler = handlers.pop();

        instance[method.toLowerCase()](route, ...handlers, async function(ctx) {
          return await lastHandler(ctx);
        });

        app.use(instance.routes()).use(instance.allowedMethods());
      });
    });
  });
};
