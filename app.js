const express = require("express");
const cookieParser = require("cookie-parser");
const { tokenMiddleWare } = require("./middleware/token");
const app = express();

module.exports = function(db) {
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.set("view engine", "ejs");

  app.get("/", (req, res) => {
    res.render("pages/landing-page", { msg: "Welcome stranger" });
  });

  // auth route
  const auth_route = require("./routes/auth")(db);
  app.use("/auth", auth_route);

  app.get("/secure/console", tokenMiddleWare, (req, res, next) => {
    if (res.problem) {
      res.render("pages/error", { msg: res.problem });
    } else {
      res.render("pages/console");
    }
  });

  // api message route
  const api_route = require("./routes/api")(db);
  app.use("/api/v1", tokenMiddleWare, api_route);

  return app;
};
