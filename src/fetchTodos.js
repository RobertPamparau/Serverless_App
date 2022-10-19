const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const fetchTodos = async (event) => {
  let todos;
  try {
    const results = await dynamo.scan({ TableName: "TodoTable" }).promise();
    todos = results.Items;

    return {
      statusCode: 200,
      body: JSON.stringify(todos),
    };
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: fetchTodos,
};
