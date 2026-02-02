const express = require("express");
const router = express.Router();

const {
  addDiscount,
  updateDiscount,
  deleteDiscount,
  getAllDiscounts
} = require("../controllers/discount");

const { isAdmin } = require("../middlewares/auth");
const { isAuthenticated } = require("../middlewares/isAuthenticated");

router.get("/",getAllDiscounts); 
router.post("/add", isAuthenticated, isAdmin, addDiscount);
router.put("/update/:discountId", isAuthenticated, isAdmin, updateDiscount);
router.delete("/delete/:discountId", isAuthenticated, isAdmin, deleteDiscount);

module.exports = router;
