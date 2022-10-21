const { response } = require("./utils");

const hello = async (event) => {
  return response(200, { message: "Hello World" });
};

module.exports = {
  handler: hello,
};
