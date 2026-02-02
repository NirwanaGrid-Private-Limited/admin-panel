const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory
} = require("../controllers/category");

const {isAdmin} = require("../middlewares/auth")
const {isAuthenticated} = require("../middlewares/isAuthenticated")

router.post("/",isAuthenticated, isAdmin,  createCategory);
router.get("/", getCategories);
router.put("/:id",isAuthenticated, isAdmin,  updateCategory);
router.delete("/:id",isAuthenticated, isAdmin, deleteCategory);

module.exports = router;
