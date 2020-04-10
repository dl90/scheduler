require("dotenv").config();
const jwt = require("jsonwebtoken"),
  fs = require("fs");

function generateToken(payload) {
  const privateKey = fs.readFileSync(__dirname + "/private.key");
  const token = jwt.sign(payload, privateKey, {
    algorithm: "RS256",
    issuer: "sampoll",
    expiresIn: "1800000" // 30min
  });
  return token;
}

function verifyToken(token) {
  const publicKey = fs.readFileSync(__dirname + "/public.key");
  let payload;
  try {
    payload = jwt.verify(token, publicKey, {
      issuer: "sampoll"
    });
  } catch (err) {
    return err;
  }
  return payload;
}

module.exports = { generateToken, verifyToken };
