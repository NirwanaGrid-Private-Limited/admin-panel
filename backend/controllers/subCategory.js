const SubCategory = require("../models/SubCategory");

// CREATE
exports.createSubCategory = async (req, res) => {
  try {
    const subCategory = await SubCategory.create(req.body);
    res.status(201).json({ success: true, subCategory });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// GET ALL
exports.getSubCategories = async (req, res) => {
  const subCategories = await SubCategory.find()
    .populate("category", "name");

  res.json({ success: true, subCategories });
};

// UPDATE
exports.updateSubCategory = async (req, res) => {
  const subCategory = await SubCategory.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json({ success: true, subCategory });
};

// DELETE
exports.deleteSubCategory = async (req, res) => {
  await SubCategory.findByIdAndDelete(req.params.id);
  res.json({ success: true, message: "SubCategory deleted" });
};
