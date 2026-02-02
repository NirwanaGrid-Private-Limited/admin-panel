const express = require("express");
const router = express.Router();
const {
  createSubCategory,
  getSubCategories,
  updateSubCategory,
  deleteSubCategory
} = require("../controllers/subCategory");

const {isAdmin} = require("../middlewares/auth")
const {isAuthenticated} = require("../middlewares/isAuthenticated")

router.post("/",isAuthenticated,  createSubCategory);
router.get("/", getSubCategories);
router.put("/:id", isAuthenticated, isAdmin, updateSubCategory);
router.delete("/:id", isAuthenticated, isAdmin,  deleteSubCategory);

module.exports = router;
