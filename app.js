const express = require('express');
const app = express();
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (db) {

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.set('view engine', 'ejs')

  app.get('/', (req, res) => {
    res.render("pages/landing-page");
  });


  app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.getUser((err, result) => {
      if (err) {
        res.render("pages/error", { msg: "Database Error" });
      } else if (result.length === 1) {
        db.getPassword((err, result) => {
          if (err) {
            res.render("pages/error", { msg: "Database Error" });
          } else if (result.length === 1) {
            // compare hash
            bcrypt.compare(password, result[0].password, function (err, result) {
              if (err) {
                res.render("pages/error", { msg: "Bcrypt" });
              } else if (result) {
                res.render("pages/console");
              } else {
                res.render("pages/error", { msg: "Incorrect login info" });
              }
            });
          }
        }, username);
      } else {
        res.render("pages/error", { msg: "Incorrect login info" });
      }
    }, username);
  });

  app.post('/sign-up', (req, res) => {
    const username = req.body.new_username;
    const password = req.body.new_password;
    const email = req.body.new_email;

    // gen hash
    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        res.render("pages/error", { msg: "Bcrypt" });
      }
      db.createUser((err, any) => {
        if (err) {
          res.render("pages/error", { msg: "Database Error" });
        } else {
          res.send({ status: "success" });
        }
        // console.log(any);
      }, username, hash, email);
    });
  });


  // for testing, need to setup routes
  // const router = express.Router();
  const user = "Test1"

  app.get('/api/v1/meetings', (req, res) => {


    db.getMeetings((err, meetings) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(meetings);
      }
    }, user) // hard-coded user for now
  })

  app.get('/api/v1/user', (req, res) => {
    db.getUserInfo((err, info) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.send(info);
      }
    }, user) // hard-coded user for now
  })

  return app
}