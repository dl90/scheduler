require("dotenv").config();
const { verifyToken } = require("../controller/jwt"),
  jwtCookieName = process.env.jwtCookieName;

function tokenMiddleWare(req, res, next) {
  // const header = req.headers['x-access-token'] || req.headers['authorization'];
  // if (header.startsWith('Bearer ')) {
  //   const bearer = header.split(' ');
  //   const token = bearer[1];

  const token = req.cookies[jwtCookieName];
  if (token) {
    const payload = verifyToken(token);
    // console.log(payload.constructor.name.includes("Error"));
    // console.log(payload.name);

    if (!payload.constructor.name.includes("Error")) {
      req.payload = payload; // payload stored on req obj
      next();
    } else {
      console.error(
      `\n--------ERROR--------\n
      \n Date:    ${Date.now()}
      \n Cookies: ${JSON.stringify(req.cookies)}
      \n Token:   ${JSON.stringify(token)}
      \n Headers: ${JSON.stringify(req.headers)}
      \n----------------------\n`
      );
      res.problem = "Invalid token"; // attaches problem to res obj
      next();
    }
  } else {
    res.problem = "No auth token supplied";
    next();
  }
}

module.exports = { tokenMiddleWare };
