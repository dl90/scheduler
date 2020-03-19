const express = require('express');
const app = express();

module.exports = function (db) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.set('view engine', 'ejs');

  app.get('/', (req, res) => {
    res.render("pages/landing-page");
  });

  // auth route
  const auth_route = require('./routes/auth')(db);
  app.use('/auth', auth_route);

  // api message route
  const api_route = require('./routes/api')(db);
  app.use('/api/v1', api_route);


  return app;
}
