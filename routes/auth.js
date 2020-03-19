const express = require("express");
const router = express.Router();
const bcrypt = require('bcrypt');

require('dotenv').config();
const saltRounds = process.env.salt;

module.exports = function (db) {

  router.post('/login', (req, res, next) => {
    const [username, password] = [req.body.username, req.body.password];

    db.getUser((err, result) => {
      if (err) {
        res.render("pages/error", { msg: "Database Error" });
      } else if (result.length === 1) {
        db.getPassword((err, result) => {
          if (err) {
            res.render("pages/error", { msg: "Database Error" });
          } else if (result.length === 1) {
            bcrypt.compare(password, result[0].password, function (err, result) {
              if (err) {
                res.render("pages/error", { msg: "Bcrypt" });
              } else if (result) {
                res.render("pages/console");
              } else {
                res.render("pages/error", { msg: "Incorrect login info" });
              };
            });
          }
        }, username);
      } else {
        res.render("pages/error", { msg: "Incorrect login info" });
      };
    }, username);
  });

  router.post('/sign-up', (req, res, next) => {
    const [username, password, email] = [req.body.new_username, req.body.new_password, req.body.new_email];

    bcrypt.hash(password, saltRounds, function (err, hash) {
      if (err) {
        res.render("pages/error", { msg: "Bcrypt" });
      } else {
        db.createUser((err, any) => {
          if (err) {
            res.render("pages/error", { msg: "Database Error" });
          } else {
            res.send({ status: "success" });
          };
          // console.log(any);
        }, username, hash, email);
      };
    });
  });

  return router;
}
