const { CloudFormation } = require("aws-sdk");
const AWS = require("aws-sdk");
const { response, status } = require("./utils");
const { verifyToken } = require("./verifyToken");
require("dotenv").config();

const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const searchByEmail = async (event) => {
  const decodedToken = verifyToken(event);
  try {
    const { email } = JSON.parse(event.body);

    const params = {
      TableName: TableName,
      FilterExpression: " contains(email, :email)",
      ExpressionAttributeValues: {
        ":email": email,
      },
      ProjectionExpression: "email,todo,gender",
    };

    const item = await dynamo.scan(params).promise();
    return response(status.OK, item.Items);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handler: searchByEmail,
};
