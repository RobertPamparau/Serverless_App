const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const { response, isValidEmail } = require("./utils");
const bcrypt = require("bcryptjs");

const dynamo = new AWS.DynamoDB.DocumentClient();

const register = async (event) => {
  const userId = v4();
  try {
    const { email, password } = JSON.parse(event.body);
    if (!email || !password) {
      return response(401, { message: "Email or password is empty" });
    }

    if (!isValidEmail(email)) {
      return response(401, { message: "Invalid email" });
    }

    const params = {
      TableName: "TodoTable",
    };

    const scanResults = [];
    const items = await dynamo.scan(params).promise();
    items.Items.forEach((item) => scanResults.push(item));
    params.ExclusiveStartKey = items.LastEvaluatedKey;

    for (const results in scanResults) {
      if (scanResults[results].email === email) {
        return response(404, { message: "Email already exist" });
      }
    }

    const encryptedPassword = bcrypt.hashSync(password.trim(), 10);
    const user = {
      id: userId,
      email: email.toLowerCase(),
      password: encryptedPassword,
    };

    await dynamo
      .put({
        TableName: "TodoTable",
        Item: user,
      })
      .promise();

    return response(200, user);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: register,
};
