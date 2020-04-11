const express = require("express"),
 router = express.Router();

module.exports = function (db) {
  router.get("/console", (req, res) => {
    if (res.problem) {
      res.render("pages/error", { msg: res.problem });
    } else {
      res.render("pages/console");
    }
  });

  router.get("/contacts", (req, res) => {
    if (res.problem) {
      res.render("pages/error", { msg: res.problem });
    } else {
      res.render("pages/contacts")
    }
  })

  return router;
}