const { Router } = require("express");
const email = require("../controller/email");
const router = Router();

router.post("/cadastraNews", email.cadastraUser);

module.exports = router;
