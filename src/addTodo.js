const { v4 } = require("uuid");
const AWS = require("aws-sdk");
const dynamo = new AWS.DynamoDB.DocumentClient();
const addTodo = async (event) => {
  try {
    const { name, todo, email, gender, password } = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4();

    if (!isValidEmail(email)) {
      return {
        statusCode: 401,
        body: JSON.stringify({ message: "Invalid email" }),
      };
    }
    console.log("this is:", password);
    const newTodo = {
      id,
      name,
      password,
      gender,
      todo,
      email,
      createdAt,
      completed: false,
    };

    await dynamo
      .put({
        TableName: "TodoTable",
        Item: newTodo,
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify(newTodo),
    };
  } catch (err) {
    console.log(err);
  }
};
const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

module.exports = {
  handler: addTodo,
};
