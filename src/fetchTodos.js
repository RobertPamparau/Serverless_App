const AWS = require("aws-sdk");
const { response } = require("./utils");
const dynamo = new AWS.DynamoDB.DocumentClient();
const fetchTodos = async (event) => {
  try {
    const results = await dynamo.scan({ TableName: "TodoTable" }).promise();
    const  todos = results.Items;

    return response(200, todos);
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: fetchTodos,
};
