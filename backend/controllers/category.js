const Category = require("../models/Category");

// CREATE CATEGORY
exports.createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const category = await Category.create({ name, slug });

    res.status(201).json({
      success: true,
      category
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

// GET ALL CATEGORIES
exports.getCategories = async (req, res) => {
  const categories = await Category.find();
  res.json({
    success: true,
    categories
  });
};

// UPDATE CATEGORY
exports.updateCategory = async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json({
    success: true,
    category
  });
};

// DELETE CATEGORY
exports.deleteCategory = async (req, res) => {
  await Category.findByIdAndDelete(req.params.id);

  res.json({
    success: true,
    message: "Category deleted"
  });
};
