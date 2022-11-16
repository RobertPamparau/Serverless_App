const AWS = require("aws-sdk");
const { response, status } = require("./utils");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const deleteTodo = async (event) => {
  const decodedToken = verifyToken(event);
  const { id } = event.pathParameters;
  const params = {
    TableName: TableName,
    Key: { id },
  };

  const result = await dynamo.get(params).promise();
  if (!result.Item) {
    return response(status.NOTFOUND, { message: "Id does not exists " });
  }

  try {
    await dynamo.delete(params).promise();
    return response(status.OK, { message: "Delete successfuly" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: deleteTodo,
};
