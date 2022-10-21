const AWS = require("aws-sdk");
const { response } = require("./utils");
const dynamo = new AWS.DynamoDB.DocumentClient();

const updateTodo = async (event) => {
  const { id } = event.pathParameters;
  const { completed } = JSON.parse(event.body);

  await dynamo
    .update({
      TableName: "TodoTable",
      Key: { id },
      UpdateExpression: "set completed = :completed",
      ExpressionAttributeValues: {
        ":completed": completed,
      },
      ReturnValues: "ALL_NEW",
    })
    .promise();

  try {
    return response(200, { message: "Todo updated" });
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: updateTodo,
};
