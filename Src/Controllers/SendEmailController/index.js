require("dotenv").config();

const { EMAIL_ADDRESS, PASSWORD_EMAIL } = process.env;

const nodemailer = require("nodemailer");
const config = {
  service: "Gmail",
  auth: {
    user: EMAIL_ADDRESS,
    pass: PASSWORD_EMAIL,
  },
};

const transporter = nodemailer.createTransport(config);

const sendEmail = (req, res) => {
  let mailOptions = {
    from: "PRueba de remitente",
    to: "rbracamonte.winhold@gmail.com",
    subject: "Pruebas",
    text: " prueba numero uno de envio de email",
  };
  console.log(EMAIL_ADDRESS, PASSWORD_EMAIL);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(500).json({ msg: error.message });
    } else {
      console.log("email sent");
      res.status(200).json({ msg: "enviado " });
    }
  });
};

const emailRegister = async (req, res) => {};

const emailOrder = async (req, res) => {};

const emailStatus = (status, user) => {};

module.exports = {
  sendEmail,
};
