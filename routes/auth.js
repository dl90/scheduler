require("dotenv").config();
const express = require("express");
const bcrypt = require("bcrypt");
const router = express.Router();
const { generateToken } = require("../controller/jwt");
const salt = parseInt(process.env.salt);
const jwtCookieName = process.env.jwtCookieName;

module.exports = function(db) {
  // login
  router.post("/login", (req, res) => {
    const [username, password] = [req.body.username, req.body.password];

    db.getUser((err, result) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else if (result.length === 1) {
        db.getPassword((err, result) => {
          if (err) {
            res.render("pages/error", { msg: "Database error" });
          } else if (result.length === 1) {
            bcrypt.compare(password, result[0].password, function(err, result) {
              if (err) {
                res.render("pages/error", { msg: "Bcrypt error" });
              }
              if (result) {
                const token = generateToken({ username });
                // res.set({ Authorization: "Bearer " + token });
                // res.send({ msg: 'ok' })
                return res
                  .cookie(jwtCookieName, token, {
                    httpOnly: false,
                    sameSite: true
                  })
                  .redirect("/secure/console");
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

  // signup
  router.post("/sign-up", (req, res) => {
    const [username, password, email] = [
      req.body.new_username,
      req.body.new_password,
      req.body.new_email
    ];

    db.getUser((err, result) => {
      if (err) {
        res.render("pages/error", { msg: "Database error" });
      } else if (result.length > 0) {
        res.render("pages/error", { msg: "User already exists" });
      } else {
        bcrypt.hash(password, salt, function(err, hash) {
          if (err) {
            res.render("pages/error", { msg: "Bcrypt" });
          } else {
            db.createUser(
              (err, result) => {
                if (err) {
                  res.render("pages/error", { msg: "Database Error" });
                } else {
                  res.render("/pages/landing-page", {
                    msg: "User successfully created."
                  });
                }
                console.log(
                  "New user registered with user id: " + result.insertId
                );
              },
              username,
              hash,
              email
            );
          }
        });
      }
    }, username);
  });

  router.get("/logout", (req, res) => {
    const token = req.cookies[jwtCookieName];
    if (token) {
      res
        .clearCookie(jwtCookieName, { httpOnly: false, sameSite: true })
        .redirect("/");
    }
  });

  return router;
};
