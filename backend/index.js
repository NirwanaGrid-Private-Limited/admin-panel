const express = require("express");
const app = express();
require("dotenv").config();

// DB & Cloudinary
const { connect } = require("./config/db");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/product");
const discountRoutes = require("./routes/discount");
const categoryRoutes = require("./routes/category");
const subCategoryRoutes = require("./routes/subCategory");
// Middlewares

const cookieParser = require("cookie-parser");
const cors = require("cors");


app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);


// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/product", productRoutes);
app.use("/api/v1/discount", discountRoutes);
app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/sub-categories", subCategoryRoutes);



// Default route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Server is running 🚀",
  });
});

// Connections
connect();

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server started successfully at port ${PORT}`);
});
