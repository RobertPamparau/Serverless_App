const AWS = require("aws-sdk");
const { response, status } = require("./utils");
const { verifyToken } = require("./verifyToken");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const fetchTodo = async (event) => {
  const decodedToken = verifyToken(event);
  const { id } = event.pathParameters;
  try {
    const result = await dynamo
      .get({ TableName: TableName, Key: { id } })
      .promise();
    const todo = result.Item;

    return response(status.OK, todo);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: fetchTodo,
};
