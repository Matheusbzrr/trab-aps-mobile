const axios = require("axios");
const cheerio = require("cheerio");

async function scrapeExame() {
  try {
    const { data } = await axios.get(
      "https://exame.com/noticias-sobre/Restaurantes/1/"
    );
    const $ = cheerio.load(data);

    const resultados = [];

    $("h3.headline-extra-small a").each((i, el) => {
      if (i < 1) {
        const titulo = $(el).text().trim();
        const link = "https://exame.com" + $(el).attr("href");
        resultados.push({ titulo, link });
      }
    });

    console.log(resultados);
    return resultados;
  } catch (err) {
    console.error("Erro no scraping:", err);
  }
}

async function scrapeVeja() {
  try {
    const { data } = await axios.get(
      "https://veja.abril.com.br/noticias-sobre/restaurantes/"
    );
    const $ = cheerio.load(data);

    const resultados = [];

    $("div.card.veja-gente").each((i, el) => {
      if (i >= 1) return false; 

      const titulo = $(el).find("h2.title").text().trim();
      const link = $(el).find("a").first().attr("href");

      if (titulo && link) {
        resultados.push({ titulo, link });
      }
    });

    console.log(resultados);
    return resultados;
  } catch (err) {
    console.error("Erro no scraping da Veja:", err);
  }
}

module.exports = {
  scrapeExame,
  scrapeVeja,
};
