const axios = require("axios");
require("dotenv").config();

const buscaRestaurantes = async (city, gap) => {
  if (gap !== undefined) {
    gap = gap * 10;
  }
  const api = `https://api.yelp.com/v3/businesses/search?location=${city}&categories=restaurants&limit=50&offset=${gap}&country=BR`;

  const response = await axios.get(api, {
    headers: {
      Authorization: `Bearer ${process.env.TOKEN_YELP}`,
    },
  });

  return await response.data;
};

const getRestaurantes = async (req, res) => {
  // if (req.query.id) {
  //   const api = `https://api.yelp.com/v3/businesses/${req.query.id}`;
  //   const response = await axios.get(api, {
  //     headers: {
  //       Authorization: `Bearer ${process.env.TOKEN_YELP}`,
  //     },
  //   });

  //   const item = response.data;

  //   const resultado = {
  //     id: item.id || "",
  //     nome: item.name || "",
  //     imagem: item.image_url || "",
  //     valor: item.price || "",
  //     avaliacao: item.rating || 0,
  //     endereco: item.location.display_address.join(", "),
  //     telefone: item.display_phone || "",
  //   };

  //   return res.status(200).json(resultado);
  // }
  if (!req.query.city) {
    return res.status(400).json({ error: "City parameter is required" });
  }

  const city = req.query.city;
  const gap = req.query.gap ? parseInt(req.query.gap) : undefined;

  try {
    const data = await buscaRestaurantes(city, gap);
    if (data.error) {
      return res.status(400).json({ error: data.error });
    }

    const restaurantes = data.businesses;
    if (!restaurantes || restaurantes.length === 0) {
      return res.status(404).json({ error: "No restaurants found" });
    }

    const resultado = restaurantes.map((item) => {
      return {
        id: item.id || "",
        nome: item.name || "",
        imagem: item.image_url || "",
        valor: item.price || "",
        avaliacao: item.rating || 0,
        endereco: item.location.display_address.join(", "),
        telefone: item.display_phone || "",
      };
    });

    return res.status(200).json(resultado);
  } catch (error) {
    console.error(
      "Erro ao buscar restaurantes:",
      error.response?.data || error.message
    );
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  getRestaurantes,
};
