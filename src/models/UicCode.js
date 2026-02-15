const mongoose = require("mongoose");

const uicCodeSchema = new mongoose.Schema(
  {
    uic_code: { type: String, required: true },
    SL_No: { type: Number, required: true },
    uic_generated_date: { type: String, required: true },
    status: {
      type: String,
      enum: ["unused", "used"],
      default: "unused",
    },
  },
  { timestamps: true }
);

// ⚠️ VERY IMPORTANT: exact collection name
module.exports = mongoose.model(
  "UicCode",
  uicCodeSchema,
  "uic_codes"
);
