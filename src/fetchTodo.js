const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();

const fetchTodo = async (event) => {
  const { id } = event.pathParameters;
  let todo;
  try {
    const result = await dynamo
      .get({ TableName: "TodoTable", Key: { id } })
      .promise();
    todo = result.Item;

    return {
      statusCode: 200,
      body: JSON.stringify(todo),
    };
  } catch (err) {
    console.log(err);
  }
};
module.exports = {
  handler: fetchTodo,
};
