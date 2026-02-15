const mongoose = require("mongoose");

const verificationLogSchema = new mongoose.Schema(
  {
    uic_code: { type: String, required: true },
    name: { type: String },
    mobile: { type: String },
    serial_no: { type: Number },
    ip: { type: String },
    result: {
      type: String,
      enum: ["valid", "duplicate", "invalid"],
      required: true
    }
  },
  { timestamps: true }
);

// collection name explicitly set (best practice)
module.exports = mongoose.model(
  "VerificationLog",
  verificationLogSchema,
  "verification_logs"
);
