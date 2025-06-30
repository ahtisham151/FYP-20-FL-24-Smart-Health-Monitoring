const express = require("express");
const router = express.Router();
const controller = require("../../controllers/users/openai-controller");

router.post("/diagnose", (req, res) =>
  controller.proceedWithDiagnose(req, res)
);

module.exports = router;
