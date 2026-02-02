const express = require("express");
const router = express.Router();

// Controller
const { login, signup } = require("../controllers/auth");

// Routes
router.post("/login", login);
router.post("/signup",signup );

module.exports = router;
