require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false, 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(req, res) {
  const emailUser = req.body.email;
  const texto = req.body.texto || "Obrigado por assinar nossa newsletter!";

  try {
    const info = await transporter.sendMail({
      from: `"Sabores de Pernambuco" <${process.env.EMAIL_USER}>`, 
      to: emailUser, 
      subject: "Novidades em Restaurantes Pernambucanos", 
      text: texto,
    });

    console.log("E-mail enviado: %s", info.messageId);
    res.status(200).json({ message: "E-mail enviado com sucesso!" });
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
  }
}

module.exports = {
  sendEmail,
};
