const { response, status } = require("./utils");

const hello = async (event) => {
  return response(status.OK, { message: "Hello World" });
};

module.exports = {
  handler: hello,
};
