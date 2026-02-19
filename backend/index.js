const express = require("express");
const app = express();
require("dotenv").config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

// DB
const { connect } = require("./config/db");

// Routes
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const discountRoutes = require("./routes/discount");
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory");
const contactRoutes = require("./routes/contact"); // 👈 NEW

// Middlewares
const cookieParser = require("cookie-parser");
const cors = require("cors");

// ---------- MIDDLEWARES ----------
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// ---------- ROUTES ----------
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/discount", discountRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/sub-categories", subCategoryRoutes);

// 👇 CONTACT FORM ROUTE
app.use("/api/v1/contact", contactRoutes);

// ---------- DEFAULT ROUTE ----------
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

// ---------- DB CONNECT ----------
connect();

// ---------- SERVER ----------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started successfully at port ${PORT}`);
});
