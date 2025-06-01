const { Router } = require("express");
const email = require("../controller/email");
const router = Router();

// Define the route for sending email
router.post("/send", email.sendEmail);

module.exports = router;
