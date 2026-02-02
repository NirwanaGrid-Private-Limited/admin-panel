const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    slug: {
      type: String,
      required: true,
      unique: true
    },

    description: {
      type: String
    },

    price: {
      type: Number,
      required: true
    },

    discountActive: {
      type: Boolean,
      default: false
    },

    discount: {
      type: Number, // percentage
      default: 0
    },

    finalPrice: {
      type: Number
    },

    subCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true
    },

    images: [
      {
        url: String,
        public_id: String
      }
    ],

    isActive: {
      type: Boolean,
      default: true
    },

    

  },
  { timestamps: true }
);


productSchema.pre("save", async function () {
  if (this.discountActive && this.discount > 0) {
    this.finalPrice = this.price - (this.price * this.discount) / 100;
  } else {
    this.finalPrice = this.price;
  }
});



module.exports = mongoose.model("Product", productSchema);
