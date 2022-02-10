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

const sendEmail = (user) => {
  let mailOptions = {
    from: "PRueba de remitente",
    to: user,
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

const emailRegister = async (email) => {
  try {
    const mailOptions = {
      from: "Kwik-E-Mart",
      to: email,
      subject: "Bienvenido a Kwik-E-Mart",
      text: " Su registro en Kwik-E-Mart ha sido realizado de manera exitosa",
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

const emailOrder = async () => {};

const emailStatus = (status, user) => {};

module.exports = {
  sendEmail,
  emailRegister,
};
