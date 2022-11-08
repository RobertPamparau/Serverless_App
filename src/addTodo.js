const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const { isValidEmail, status, encryptedPassword } = require("./utils");
const { response } = require("./utils");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const addTodo = async (event) => {
  try {
    const id = v4();
    const createdAt = new Date().toISOString();
    const newTodo = JSON.parse(event.body);
    newTodo.id = id;
    newTodo.createdAt = createdAt;
    const encryptedPassword1 = encryptedPassword(newTodo.password);
    newTodo.password = encryptedPassword1;

    if (!isValidEmail(newTodo.email)) {
      return response(status.UNAUTHORIZED, { message: "Invalid email" });
    }
    await dynamo
      .put({
        TableName: TableName,
        Item: newTodo,
      })
      .promise();

    return response(status.OK, newTodo);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handler: addTodo,
};
