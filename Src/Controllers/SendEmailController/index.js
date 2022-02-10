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

const emailOrder = async (email) => {
  try {
    const mailOptions = {
      from: "Kwik-E-Mart",
      to: email,
      subject: "Bienvenido a Kwik-E-Mart",
      text: " Su compra se ha realizado de manera exitosa",
    };

    await transporter.sendMail(mailOptions);
  } catch (err) {
    console.log(err);
  }
};

const emailStatus = async (status, email) => {
  try {
    if (status == "procesada") {
      const mailOptions = {
        from: "Kwik-E-Mart",
        to: email,
        subject: "Bienvenido a Kwik-E-Mart",
        text: " muchas gracias por su preferencia su producto esta siendo procesada",
      };

      await transporter.sendMail(mailOptions);
      console.log(" procesada de manera exitosa");
    }
    if (status == "completada") {
      const mailOptions = {
        from: "Kwik-E-Mart",
        to: email,
        subject: "Bienvenido a Kwik-E-Mart",
        text: " Su producto ha sido entregado de manera exitosa",
      };

      await transporter.sendMail(mailOptions);
      console.log(" completada de manera exitosa");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  sendEmail,
  emailRegister,
  emailStatus,
  emailOrder,
};
