const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

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

const constants = {
  USERNAME: "robert.pamparau@assist.ro",
  PASSWORD: "Labus_123",
};

const generateToken = (userInfo) => {
  if (!userInfo) {
    return null;
  }

  return jwt.sign(userInfo, process.env.TOKEN_KEY, {
    expiresIn: "2h",
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
  constants,
};
