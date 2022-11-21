const AWS = require("aws-sdk");
const { response, status } = require("./utils");
const { verifyToken } = require("./verifyToken");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const fetchTodo = async (event) => {
  const decodedToken = verifyToken(event);
  const { id } = event.pathParameters;

  if (!id) {
    return response(status.NOTFOUND, { message: "Id is empty" });
  }

  try {
    const result = await dynamo
      .get({ TableName: TableName, Key: { id } })
      .promise();

    const todo = result.Item;
    if (!todo) {
      return response(status.NOTFOUND, { message: "User does not exist" });
    }

    return response(status.OK, todo);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: fetchTodo,
};
