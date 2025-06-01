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
app.use("/api/yelp", yelpRoutes);


app.get("/", (req, res) => {
  res.send("Welcome to the API!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
