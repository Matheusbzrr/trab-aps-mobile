require("dotenv").config();
const nodemailer = require("nodemailer");
const {
  scrapeExame,
  scrapeVeja,
  scrapeBloomberglinea,
} = require("../controller/scrape");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const montaEstrutura = async () => {
  const [exame, veja, bloomberg] = await Promise.all([
    scrapeExame(),
    scrapeVeja(),
    scrapeBloomberglinea(),
  ]);

  let texto = "📰 Novidades sobre gastronomia:\n\n";

  const formatar = (nome, noticias) => {
    if (!noticias.length) return "";
    let bloco = `🔹 ${nome}:\n`;
    noticias.forEach((n, i) => {
      bloco += `\n${i + 1}. ${n.titulo}`;
      if (n.paragrafo) bloco += `\n${n.paragrafo}`;
      bloco += `\n${n.link}\n`;
    });
    return bloco + "\n";
  };

  texto += formatar("Exame", exame);
  texto += formatar("Veja", veja);
  texto += formatar("Bloomberg Línea", bloomberg);

  console.log("Texto formatado:\n", texto);
  return texto;
};

const sendEmail = async (emailUser, texto) => {
  try {
    const info = await transporter.sendMail({
      from: `"NewsLatter" <${process.env.EMAIL_USER}>`,
      to: emailUser,
      subject: "Novidades sobre gastronomia no Brasil e no mundo",
      text: texto,
    });

    console.log("E-mail enviado: %s", info.messageId);
    return;
  } catch (error) {
    console.error("Erro ao enviar o e-mail:", error);
  }
};

const cadastraUser = async (req, res) => {
  console.log(req.body);
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email é obrigatório" });
  }

  try {
    const texto = await montaEstrutura();
    await sendEmail(email, texto);
    res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao cadastrar usuário:", error);
    res.status(500).json({ error: "Erro ao cadastrar usuário" });
  }
};

module.exports = {
  cadastraUser,
};
