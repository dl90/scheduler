require("dotenv").config();
const express = require("express"),
  bcrypt = require("bcrypt"),
  router = express.Router(),
  { generateToken } = require("../controller/jwt");

const salt = parseInt(process.env.salt),
  jwtCookieName = process.env.jwtCookieName;

module.exports = function (db) {
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
            bcrypt.compare(password, result[0].password, function (err, result) {
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
                res.render("pages/error", { msg: "Login failed: Invalid user ID or password" });
              }
            });
          }
        }, username);
      } else {
        res.render("pages/error", { msg: "Login failed: Invalid user ID or password" });
      }
    }, username);
  });

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
        console.log(result)
        res.render("pages/error", { msg: "Account creation error" });
      } else {
        bcrypt.hash(password, salt, function (err, hash) {
          if (err) {
            res.render("pages/error", { msg: "Bcrypt error" });
          } else {
            db.createUser(
              (err, result) => {
                if (err) {
                  res.render("pages/error", { msg: "Database Error" });
                } else {
                  res.render("pages/landing-page", {
                    msg: `Successfully registered ${username}.`
                  });
                }
                console.info(
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
