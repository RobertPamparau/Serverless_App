const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const { isValidEmail } = require("./utils");
const { response } = require("./utils");
const dynamo = new AWS.DynamoDB.DocumentClient();
const addTodo = async (event) => {
  try {
    const id = v4();
    const createdAt = new Date().toISOString();
    const newTodo = JSON.parse(event.body);
    newTodo.id = id;
    newTodo.createdAt = createdAt;

    if (!isValidEmail(newTodo.email)) {
      return response(401, { message: "Invalid email" });
    }
    await dynamo
      .put({
        TableName: "TodoTable",
        Item: newTodo,
      })
      .promise();

    return response(200, newTodo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handler: addTodo,
};
