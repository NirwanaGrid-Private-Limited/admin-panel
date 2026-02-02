const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  toggleProductStatus,
  toggleDiscount,
  deleteProductImage
} = require("../controllers/product");

const {isAdmin} = require("../middlewares/auth")
const {isAuthenticated} = require("../middlewares/isAuthenticated")

const upload = require("../middlewares/multer"); 

router.post("/",isAuthenticated, isAdmin, upload.array("images", 5), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id",isAuthenticated, isAdmin, upload.array("images", 5), updateProduct);
router.delete("/:id", isAuthenticated, isAdmin, deleteProduct);
router.patch("/:id/toggle-status", toggleProductStatus);
router.patch("/:id/toggle-discount",isAuthenticated, isAdmin, toggleDiscount);
router.delete("/image",isAuthenticated,  isAdmin, deleteProductImage);



module.exports = router;
