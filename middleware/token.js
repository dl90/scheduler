require("dotenv").config();
const { verifyToken } = require("../controller/jwt");
const jwtCookieName = process.env.jwtCookieName;

function tokenMiddleWare(req, res, next) {
  // const header = req.headers['x-access-token'] || req.headers['authorization'];

  // if (header.startsWith('Bearer ')) {
  //   const bearer = header.split(' ');
  // const token = bearer[1];

  const token = req.cookies[jwtCookieName];
  if (token) {
    const payload = verifyToken(token);
    if (typeof payload !== Error) {
      req.payload = payload; // payload stored on req obj
      next();
    } else {
      res.problem = "Invalid token";
      next();
    }
  } else {
    res.problem = "No auth token supplied";
    next();
  }
  // }
}

module.exports = { tokenMiddleWare };
