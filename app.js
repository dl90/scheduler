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


  // for testing, need to setup routes
  // const router = express.Router();
  // const user = "Test1"

  // app.get('/api/v1/meetings', (req, res) => {
  //   db.getMeetings((err, meetings) => {
  //     if (err) {
  //       res.sendStatus(500);
  //     } else {
  //       res.send(meetings);
  //     }
  //   }, user) // hard-coded user for now
  // })

  // app.get('/api/v1/user', (req, res) => {
  //   db.getUserInfo((err, info) => {
  //     if (err) {
  //       res.sendStatus(500);
  //     } else {
  //       res.send(info);
  //     }
  //   }, user) // hard-coded user for now
  // })

  return app;
}
