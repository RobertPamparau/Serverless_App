const { CloudFormation } = require("aws-sdk");
const AWS = require("aws-sdk");
const { response, status } = require("./utils");
require("dotenv").config();

const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const searchByEmail = async (event) => {
  try {
    const { email } = JSON.parse(event.body);

    const params = {
      TableName: TableName,
      FilterExpression: " contains(email, :email)",
      ExpressionAttributeValues: {
        ":email": email,
      },
    };

    const item = await dynamo.scan(params).promise();
    const add = item.Items;
    for (const search in add) {
      delete add[search].password;
    }
    return response(status.OK, item.Items);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handler: searchByEmail,
};
