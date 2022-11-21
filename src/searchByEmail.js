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

    if (!email) {
      return response(status.NOTFOUND, { message: "Email is empty" });
    }

    const params = {
      TableName: TableName,
      FilterExpression: " contains(email, :email)",
      ExpressionAttributeValues: {
        ":email": email,
      },
      ProjectionExpression: "email,todo,gender",
    };

    const item = await dynamo.scan(params).promise();
    const search = item.Items;
    console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", JSON.stringify(search));

    if (search.length == 0) {
      return response(status.NOTFOUND, { message: "User does not exist" });
    }

    return response(status.OK, search);
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handler: searchByEmail,
};
