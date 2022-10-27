const isValidEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const response = (statusCode, body) => {
  return {
    statusCode: statusCode,
    body: JSON.stringify(body),
  };
};

const status = {
  UNAUTHORIZED: "401",
  OK: "200",
  NOTFOUND: "404",
};

module.exports = { isValidEmail, response, status };
