const { verifyToken } = require('../controller/jwt');

function tokenMiddleWare(req, res, next) {
  const header = req.headers['x-access-token'] || req.headers['authorization'];

  console.log(req.headers);
  if (header.startsWith('Bearer ')) {
    const bearer = header.split(' ');
    const token = bearer[1];

    if (token) {
      const payload = verifyToken(token);
      if (typeof payload !== Error) {
        req.payload = payload;
        next();
      } else {
        res.render('/pages/error', { msg: 'Invalid token' });
      };
    } else {
      res.render('/pages/error', { msg: 'No auth token supplied' });
    };
  }
};

module.exports = { tokenMiddleWare }