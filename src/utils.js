const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const response = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
  };
};

const status = {
  UNAUTHORIZED: "401",
  OK: "200",
  NOTFOUND: "404",
};

const generateToken = (userInfo) => {
  if (!userInfo) {
    return null;
  }

  return jwt.sign(userInfo, process.env.TOKEN_KEY, {
    expiresIn: "1h",
  });
};

const encryptedPassword = (password) => {
  return bcrypt.hashSync(password.trim(), 10);
};

module.exports = {
  isValidEmail,
  response,
  status,
  generateToken,
  encryptedPassword,
};
