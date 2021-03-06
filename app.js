const express = require("express"),
  cookieParser = require("cookie-parser"),
  helmet = require("helmet"),
  { tokenMiddleWare } = require("./middleware/token");

app = express();
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

// landing page
app.get("/", (req, res) => {
  res.render("pages/landing-page", { msg: "Welcome stranger" });
});

module.exports = function (db) {

  // auth route
  const auth_route = require("./routes/auth")(db);
  app.use("/auth", auth_route);

  // console route
  const secure_route = require("./routes/secure")(db);
  app.use("/secure", tokenMiddleWare, secure_route);

  // api message route
  const api_route = require("./routes/api")(db);
  app.use("/api/v1", tokenMiddleWare, api_route);

  return app;
};
