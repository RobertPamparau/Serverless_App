const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const { response, isValidEmail, status } = require("./utils");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const register = async (event) => {
  const userId = v4();
  try {
    const { email, password } = JSON.parse(event.body);
    if (!email || !password) {
      return response(status.NOTFOUND, {
        message: "Email or password is empty",
      });
    }

    if (!isValidEmail(email)) {
      return response(status.UNAUTHORIZED, { message: "Invalid email" });
    }

    const params = {
      TableName: TableName,
      FilterExpression: "email = :email",
      ExpressionAttributeValues: { ":email": email },
    };

    const items = await dynamo.scan(params).promise();

    if (items.Items.length > 0) {
      return response(status.UNAUTHORIZED, { message: "Email already exists" });
    }

    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const user = {
      id: userId,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    await dynamo
      .put({
        TableName: TableName,
        Item: user,
      })
      .promise();

    return response(status.OK, user);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: register,
};
