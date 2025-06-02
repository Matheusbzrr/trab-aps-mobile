const { Router } = require("express");
const llm = require("../controller/llm");
const router = Router();

router.post("/prompt", llm.getLLMResponse);

module.exports = router;
