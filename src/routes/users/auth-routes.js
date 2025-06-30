const express = require("express");
const router = express.Router();
const controller = require("../../controllers/users/auth-controller");

// POST /auth/signup
router.post("/signup", (req, res) => controller.signUp(req, res));

// POST /auth/signin
router.post("/signin", (req, res) => controller.signIn(req, res));

module.exports = router;
