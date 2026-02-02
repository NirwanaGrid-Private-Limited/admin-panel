const Discount = require("../models/discount");

exports.addDiscount = async (req, res) => {
  try {
    const {
      name,
      discountType,
      value,
      products,
      startDate,
      endDate,
    } = req.body;

    // Validation
    if (
      !name ||
      !discountType ||
      !value ||
      !products ||
      !startDate ||
      !endDate
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existing = await Discount.find({
      products: { $in: products },
      startDate: { $lte: endDate },
      endDate: { $gte: startDate }
    });

    if (existing.length > 0) {
      return res.status(400).json({
        success: false,
        message: "Discount overlap detected for selected products"
      });
    }

    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "At least one product is required",
      });
    }

    if (new Date(startDate) >= new Date(endDate)) {
      return res.status(400).json({
        success: false,
        message: "End date must be greater than start date",
      });
    }

    const discount = await Discount.create({
      name,
      discountType,
      value,
      products,
      startDate,
      endDate,
      createdBy: req.user.id,
    });

    return res.status(201).json({
      success: true,
      message: "Discount added successfully",
      discount,
    });
  } catch (error) {
    console.error("Add Discount Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add discount",
    });
  }
};

exports.updateDiscount = async (req, res) => {
  try {
    const { discountId } = req.params;
    const updates = req.body;

    if (
      updates.startDate &&
      updates.endDate &&
      new Date(updates.startDate) >= new Date(updates.endDate)
    ) {
      return res.status(400).json({
        success: false,
        message: "End date must be greater than start date",
      });
    }

    const discount = await Discount.findByIdAndUpdate(
      discountId,
      updates,
      { new: true }
    );

    if (!discount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount updated successfully",
      discount,
    });
  } catch (error) {
    console.error("Update Discount Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update discount",
    });
  }
};


exports.deleteDiscount = async (req, res) => {
  try {
    const { discountId } = req.params;

    const discount = await Discount.findByIdAndDelete(discountId);

    if (!discount) {
      return res.status(404).json({
        success: false,
        message: "Discount not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Discount deleted successfully",
    });
  } catch (error) {
    console.error("Delete Discount Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to delete discount",
    });
  }
};

exports.getAllDiscounts = async (req, res) => {
  try {
    const discounts = await Discount.find()
      .populate("products", "name price discount discountActive");

    return res.status(200).json({
      success: true,
      discounts
    });
  } catch (error) {
    console.error("Get Discounts Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch discounts"
    });
  }
};



