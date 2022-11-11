const AWS = require("aws-sdk");
const { response, isValidEmail, status, generateToken } = require("./utils");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const login = async (event) => {
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
      FilterExpression: " contains(email, :email)",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const items = await dynamo.scan(params).promise();
    const search = items.Items;
    if (search.length === 0) {
      return response(status.UNAUTHORIZED, { message: "User does not exist" });
    }

    const isValidPassword = await bcrypt.compare(
      password.trim(),
      search[0].password
    );

    if (!isValidPassword) {
      return response(status.UNAUTHORIZED, {
        message: "The password is not correct",
      });
    }

    const userInfo = {
      email: search[0].email,
      id: search[0].id,
    };

    const token = generateToken(userInfo);
    return response(status.OK, { token: token });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handler: login,
};
