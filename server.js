const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 3000;
const app = express();

const corsOptions = {
  origin: "*",
  methods: "GET,POST,PUT,DELETE,PATCH",
  allowedHeaders: "Content-Type, Authorization",
};

app.use(cors(corsOptions));
app.use(express.json());

const yelpRoutes = require("./src/routes/yelpRoutes");
const emailRoutes = require("./src/routes/emailRoutes");
const { scrapeExame, scrapeVeja } = require("./src/controller/scrap");
scrapeExame();
scrapeVeja();

app.get("/api/yelp", yelpRoutes);
app.post("/api/email", emailRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
