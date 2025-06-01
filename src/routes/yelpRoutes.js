const { Router } = require("express");
const yelpController = require("../controller/yelp");
const router = Router();

// Define the route for getting restaurants
router.get("/restaurantes", yelpController.getRestaurantes);

module.exports = router;
