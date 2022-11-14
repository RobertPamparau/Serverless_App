const jwt = require("jsonwebtoken");
const { response, status } = require("./utils");

const verifyToken = (event) => {
  try {
    const token = event.headers.Authorization;

    if (!token) {
      throw new Error({ message: "A token is required for authentication" });
    }

    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    return response(status.OK, decoded);
  } catch (err) {
    throw new Error(err);
  }
};
module.exports = {
  verifyToken,
};
