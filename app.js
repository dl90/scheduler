const express = require('express');
const { tokenMiddleWare } = require('./middleware/token');
const app = express();

module.exports = function (db) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.render("pages/landing-page", { msg: "Welcome stranger" });
  });

  // auth route
  const auth_route = require('./routes/auth')(db);
  app.use('/auth', auth_route);

  app.get('/secure/console', (req, res, next) => {
    tokenMiddleWare(req, res, next);
    res.render('pages/console');
  });

  // api message route
  const api_route = require('./routes/api')(db);
  app.use('/api/v1', tokenMiddleWare, api_route);


  return app;
}
