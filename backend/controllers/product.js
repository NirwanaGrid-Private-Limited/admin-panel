const Product = require("../models/Product");
const cloudinary = require("../config/cloudinary");
const Discount = require("../models/discount");
const calculateFinalPrice = require("../utils/calculateFinalPrice");

// CREATE PRODUCT
exports.createProduct = async (req, res) => {
  try {
    let images = [];

    if (req.files && Array.isArray(req.files)) {
      for (const file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          {
            folder: "products",
          }
        );

        images.push({
          url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }

    const product = await Product.create({
      ...req.body,
      images,
    });

    return res.status(201).json({
      success: true,
      product,
    });
  } catch (err) {
    console.error("CREATE PRODUCT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET ALL PRODUCTS (ADMIN / UI)
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true })
      .populate({
        path: "subCategory",
        populate: {
          path: "category",
          model: "Category"
        }
      });

    const discounts = await Discount.find({
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() }
  });

    const updatedProducts = products.map((product) => {
      // 🔥 find bulk discount
      const bulkDiscount = discounts.find((d) =>
        d.products.some(p => p.toString() === product._id.toString())
      );

      let finalPrice = product.price;
      let appliedDiscount = null;

      if (bulkDiscount) {
        finalPrice = calculateFinalPrice(product.price, bulkDiscount);
        appliedDiscount = bulkDiscount;
      } else if (product.discountActive) {
        finalPrice = product.price - (product.price * product.discount) / 100;
      }

      return {
        ...product.toObject(),
        finalPrice,
        appliedDiscount
      };
    });

    res.json({
      success: true,
      products: updatedProducts
    });
  } catch (err) {
    console.error("GET PRODUCTS ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};


// GET SINGLE PRODUCT
// GET SINGLE PRODUCT
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate({
        path: "subCategory",
        populate: {
          path: "category",
          model: "Category"
        }
      });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Apply discount if any
    const discounts = await Discount.find({
      startDate: { $lte: new Date() },
      endDate: { $gte: new Date() },
      products: product._id
    });

    let finalPrice = product.price;
    let appliedDiscount = null;

    if (discounts.length > 0) {
      const bulkDiscount = discounts[0];
      finalPrice = calculateFinalPrice(product.price, bulkDiscount);
      appliedDiscount = bulkDiscount;
    } else if (product.discountActive) {
      finalPrice = product.price - (product.price * product.discount) / 100;
    }

    res.json({
      success: true,
      product: {
        ...product.toObject(),
        finalPrice,
        appliedDiscount
      }
    });
  } catch (err) {
    console.error("GET PRODUCT BY ID ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// UPDATE PRODUCT
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // 🔥 STEP 1: Handle Image Deletion
    let finalImages = [];

    if (req.body.existingImages) {
      // Parse existing images sent from frontend
      const existingImages = JSON.parse(req.body.existingImages);

      // Find images to delete (in DB but not in existingImages)
      const imagesToDelete = product.images.filter(
        (img) => !existingImages.some((keepImg) => keepImg.public_id === img.public_id)
      );

      // Delete from Cloudinary
      for (const img of imagesToDelete) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
          console.log(`Deleted image from Cloudinary: ${img.public_id}`);
        } catch (error) {
          console.error(`Failed to delete image ${img.public_id}:`, error);
        }
      }

      // Keep only the images that should remain
      finalImages = existingImages;
    } else {
      // If no existingImages sent, keep all current images
      finalImages = [...product.images];
    }

    // 🔥 STEP 2: Add new images (if any)
    if (req.files && req.files.length > 0) {
      for (let file of req.files) {
        const result = await cloudinary.uploader.upload(
          `data:${file.mimetype};base64,${file.buffer.toString("base64")}`,
          { folder: "products" }
        );

        finalImages.push({
          url: result.secure_url,
          public_id: result.public_id
        });
      }
    }

    // 🔥 STEP 3: Update product fields
    const { existingImages, ...updateData } = req.body;
    Object.assign(product, updateData);
    product.images = finalImages;

    await product.save(); // 🔥 price/discount recalculated

    // Populate for response
    await product.populate({
      path: "subCategory",
      populate: {
        path: "category",
        select: "name"
      }
    });

    res.json({
      success: true,
      message: "Product updated successfully",
      product
    });
  } catch (err) {
    console.error("UPDATE PRODUCT ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// DELETE PRODUCT
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Delete all images from Cloudinary
    if (product.images && product.images.length > 0) {
      for (const img of product.images) {
        try {
          await cloudinary.uploader.destroy(img.public_id);
          console.log(`Deleted image: ${img.public_id}`);
        } catch (error) {
          console.error(`Failed to delete image ${img.public_id}:`, error);
        }
      }
    }

    await Product.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Product deleted successfully"
    });
  } catch (err) {
    console.error("DELETE PRODUCT ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// TOGGLE PRODUCT STATUS (ACTIVE / INACTIVE)
exports.toggleProductStatus = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product.isActive = !product.isActive;
    await product.save();

    res.json({
      success: true,
      message: `Product ${product.isActive ? "Activated" : "Deactivated"}`,
      product
    });
  } catch (err) {
    console.error("TOGGLE STATUS ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// TOGGLE DISCOUNT ON / OFF
exports.toggleDiscount = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    product.discountActive = !product.discountActive;
    await product.save();

    res.json({
      success: true,
      message: `Discount ${product.discountActive ? "Activated" : "Deactivated"}`,
      product
    });
  } catch (err) {
    console.error("TOGGLE DISCOUNT ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// DELETE SINGLE PRODUCT IMAGE
exports.deleteProductImage = async (req, res) => {
  try {
    const { productId, public_id } = req.body;

    if (!productId || !public_id) {
      return res.status(400).json({
        success: false,
        message: "Product ID and public_id are required"
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(public_id);
      console.log(`Deleted image: ${public_id}`);
    } catch (error) {
      console.error(`Failed to delete image ${public_id}:`, error);
    }

    // Remove from product
    product.images = product.images.filter(
      (img) => img.public_id !== public_id
    );

    await product.save();

    res.json({
      success: true,
      message: "Image removed successfully",
      product
    });
  } catch (err) {
    console.error("DELETE IMAGE ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};
