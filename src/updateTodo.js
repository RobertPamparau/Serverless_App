const AWS = require("aws-sdk");
const { response, status } = require("./utils");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const updateTodo = async (event) => {
  const { id } = event.pathParameters;
  const params = JSON.parse(event.body);
  const user = {
    TableName: TableName,
    Key: { id },
    UpdateExpression: "set",
    ExpressionAttributeValues: {},
    ReturnValues: "ALL_NEW",
  };
  for (const find in params) {
    user.UpdateExpression += ` ${find} = :${find},`;
    user.ExpressionAttributeValues[`:${find}`] = params[find];
  }
  user.UpdateExpression = user.UpdateExpression.slice(0, -1);

  await dynamo.update(user).promise();

  try {
    return response(status.OK, { message: "Todo updated" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: updateTodo,
};
