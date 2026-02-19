const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");

// Controller
const {
  submitContactForm,
} = require("../controllers/contactController");

// ---------------- RATE LIMIT ----------------
// 1 IP → max 5 requests in 15 minutes
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  message: {
    success: false,
    message: "Too many requests. Please try again later.",
  },
});

// ---------------- ROUTE ----------------
router.post("/", contactLimiter, submitContactForm);

module.exports = router;
