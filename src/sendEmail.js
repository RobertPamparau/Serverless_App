const nodemailer = require("nodemailer");
const { constants } = require("./utils");

const sendEmail = async (event) => {
  let transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    auth: {
      user: constants.USERNAME,
      pass: constants.PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: '"Robert" <robert.pamparau@assist.ro>',
    to: event.email,
    subject: event.subject,
    text: event.text,
    html: event.html,
  });

  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: "Go Serverless v1.0! Your function executed successfully!",
        data: {
          messageId: info.messageId,
          previewURL: nodemailer.getTestMessageUrl(info),
        },
      },
      null,
      2
    ),
  };
};

module.exports = {
  sendEmail,
};
