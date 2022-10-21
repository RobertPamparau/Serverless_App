const AWS = require("aws-sdk");
const { response } = require("./utils");
const dynamo = new AWS.DynamoDB.DocumentClient();

const fetchTodo = async (event) => {
  const { id } = event.pathParameters;
  try {
    const result = await dynamo
      .get({ TableName: "TodoTable", Key: { id } })
      .promise();
    const todo = result.Item;

    return response(200, todo);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: fetchTodo,
};
