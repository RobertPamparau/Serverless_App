const AWS = require("aws-sdk");
const { response, status } = require("./utils");
const { verifyToken } = require("./verifyToken");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const fetchTodos = async (event) => {
  const decodedToken = verifyToken(event);
  try {
    const results = await dynamo.scan({ TableName: TableName }).promise();
    const toDos = results.Items;

    return response(status.OK, toDos);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: fetchTodos,
};
