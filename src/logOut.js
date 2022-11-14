const AWS = require("aws-sdk");
const { response, status } = require("./utils");
const dynamo = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.TABLE_NAME;

const logOut = async (event) => {
  const { id } = event.pathParameters;
  try {
    const params = {
      TableName: TableName,
      Key: { id: id },
    };

    const getUser = await dynamo.get(params).promise();
    const result = getUser.Item;

    if (!result) {
      return response(status.NOTFOUND, { message: "User does not found" });
    }

    await dynamo
      .delete({
        TableName: TableName,
        Key: { id },
        Item: result.token,
      })
      .promise();
    return response(status.OK, { message: "Delete successfuly" });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  handler: logOut,
};
