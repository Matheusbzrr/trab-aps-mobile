const axios = require("axios");
require("dotenv").config();
const { ChatGroq } = require("@langchain/groq");
const { scrapeRestaurantes } = require("../controller/scrape");

const getLLMResponse = async (req, res) => {
  const prompt = req.body.prompt;
  if (!prompt) {
    return res.status(400).json({ error: "Pergunte alguma coisa" });
  }
  const contextoRestaurantes = await scrapeRestaurantes();

  const contextoFormatado = contextoRestaurantes
    .map(({ nome, descricao }) => `🍽️ ${nome}:\n${descricao}`)
    .join("\n\n");

  const CONTEXTO =
    `Você é um assistente de IA especializado em gastronomia, capaz de responder perguntas sobre restaurantes, pratos e tendências culinárias na cidade do Recife. ` +
    `Use as informações abaixo para responder dúvidas sobre onde comer:\n\n${contextoFormatado}` +
    `\n\nNão responda nada sobre programação, matematica ou assuntos fora do contexto gastronomico\n\n` +
    `Responda sempre em texto plano, jamais coloque emojis, markdown ou formatação especial.\n\n`;

  try {
    const model = new ChatGroq({
      model: "llama3-70b-8192",
      apiKey: process.env.GROQ_API_KEY,
      temperature: 0.7,
      max_completion_tokens: 500,
      top_p: 1,
      stream: false,
    });

    const messages = [
      {
        role: "system",
        content: CONTEXTO,
      },
      {
        role: "user",
        content: prompt,
      },
    ];

    const response = await model.invoke(messages);
    res.status(200).json({ message: response.content });
  } catch (error) {
    console.error("Erro ao obter resposta do LLM:", error);
    throw new Error("Erro ao obter resposta do LLM");
  }
};

module.exports = {
  getLLMResponse,
};
