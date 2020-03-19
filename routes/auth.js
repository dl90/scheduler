require('dotenv').config();
const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const salt = parseInt(process.env.salt);

module.exports = function (db) {

  // login
  router.post('/login', (req, res) => {
    const [username, password] = [req.body.username, req.body.password];

    db.getUser((err, result) => {
      if (err) {
        res.render('pages/error', { msg: 'Database error' });
      } else if (result.length === 1) {
        db.getPassword((err, result) => {
          if (err) {
            res.render('pages/error', { msg: 'Database error' });
          } else if (result.length === 1) {
            bcrypt.compare(password, result[0].password, function (err, result) {
              if (err) {
                res.render('pages/error', { msg: 'Bcrypt' });
              } else if (result) {
                res.render('pages/console');
              } else {
                res.render('pages/error', { msg: 'Incorrect login info' });
              };
            });
          }
        }, username);
      } else {
        res.render('pages/error', { msg: 'Incorrect login info' });
      };
    }, username);
  });

  // signup
  router.post('/sign-up', (req, res) => {
    const [username, password, email] = [req.body.new_username, req.body.new_password, req.body.new_email];

    db.getUser((err, result) => {
      if (err) {
        res.render('pages/error', { msg: 'Database error' });
      } else if (result.length > 0) {
        res.render('pages/error', { msg: 'User already exists' });
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            res.render('pages/error', { msg: 'Bcrypt' });
          } else {
            db.createUser((err, result) => {
              if (err) {
                res.render('pages/error', { msg: 'Database Error' });
              } else {
                res.send({ status: 'success' });
              };
              console.log('New user registered with user id: ' + result.insertId);
            }, username, hash, email);
          };
        });
      };
    }, username);
  });

  return router;
}
