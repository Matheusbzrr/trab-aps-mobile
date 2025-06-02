const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const scrapeExame = async () => {
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
};

const scrapeVeja = async () => {
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
};

const scrapeBloomberglinea = async () => {
  try {
    const { data } = await axios.get(
      "https://www.bloomberglinea.com.br/tags/restaurantes/"
    );
    const $ = cheerio.load(data);

    const noticias = [];

    $("div.flex.flex-col").each((index, element) => {
      if (index < 1) {
        const titulo = $(element).find("h2 a").text().trim();
        const paragrafo = $(element).find("p").text().trim();
        const linkRelativo = $(element).find("h2 a").attr("href");
        const linkCompleto = linkRelativo
          ? `https://www.bloomberglinea.com.br${linkRelativo}`
          : "";

        if (titulo && paragrafo && linkCompleto) {
          noticias.push({ titulo, paragrafo, link: linkCompleto });
        }
      }
    });
    console.log(noticias);
    return noticias;
  } catch (error) {
    console.error("Erro ao buscar ou processar a página:", error);
  }
};

async function scrapeRestaurantes() {
  const url = "https://www.viajenaviagem.com/destino/recife/onde-comer/";
  const { data } = await axios.get(url);
  const $ = cheerio.load(data);

  const lista = [];

  $("h2, h3").each((i, el) => {
    const nome = $(el).text().trim();
    const nomesIgnorados = [
      "Onde comer em Recife e Olinda",
      "Restaurantes em Boa Viagem & Pina",
      "Restaurantes em Casa Forte, Graças & Zona Norte",
      "Restaurantes no Recife Antigo & arredores",
      "Restaurantes em Olinda",
    ];

    if (nomesIgnorados.includes(nome)) return;

    const descricaoElementos = $(el).nextUntil("h2, h3").filter("p, li");

    const descricao = descricaoElementos
      .map((_, elem) => $(elem).text().trim())
      .get()
      .join(" ");

    if (nome && descricao.length > 30) {
      lista.push({
        nome,
        descricao,
      });
    }
  });
  return lista;
}

const path = "restaurantes.json";
if (!fs.existsSync(path)) {
  scrapeRestaurantes()
    .then((restaurantes) => {
      fs.writeFileSync(path, JSON.stringify(restaurantes, null, 2));
      console.log("Dados salvos em restaurantes.json");
    })
    .catch(console.error);
} else {
  console.log("Arquivo restaurantes.json já existe. Ignorando scraping.");
}

module.exports = {
  scrapeExame,
  scrapeVeja,
  scrapeBloomberglinea,
  scrapeRestaurantes,
};
