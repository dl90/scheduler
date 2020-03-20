require('dotenv').config();
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');

function generateToken(payload) {
  const privateKey = fs.readFileSync(__dirname + '/private.key');
  const token = jwt.sign(payload, privateKey,
    {
      algorithm: 'RS256',
      issuer: 'sampoll',
      expiresIn: '1800000' // 30min
    });
  return token;
};

function verifyToken(token) {
  const publicKey = fs.readFileSync(__dirname + '/public.key');
  const payload = jwt.verify(token, publicKey,
    {
      issuer: 'sampoll'
    });
  return payload;
};

// const payload = { username: 'test' };
// const token = generateToken(payload);
// console.log(token);
// const decoded = verifyToken(token);
// console.log(decoded);

module.exports = { generateToken, verifyToken };