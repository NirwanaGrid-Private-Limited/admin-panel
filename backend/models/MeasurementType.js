const mongoose = require("mongoose");

const measurementTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
  
      trim: true,
      unique: true, 
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "MeasurementType",
  measurementTypeSchema
);
