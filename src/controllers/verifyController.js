const UIC = require("../models/UicCode");
const VerificationLog = require("../models/VerificationLog");

exports.verifyCode = async (req, res) => {
  try {
    const { uic_code, name, mobile, serial_no } = req.body;

    // 1️⃣ basic validation
    if (!uic_code) {
      return res.status(400).json({
        success: false,
        message: "UIC code is required",
      });
    }

    console.log("Incoming code:", uic_code);

    // 2️⃣ check code in DB
    const code = await UIC.findOne({ uic_code });
    console.log("DB result:", code);

    // ❌ INVALID / FAKE
    if (!code) {
      await VerificationLog.create({
        uic_code,
        name,
        mobile,
        serial_no,
        ip: req.ip,
        result: "invalid",
      });

      return res.status(404).json({
        success: false,
        message: "Invalid or fake product",
      });
    }

    // 🔁 DUPLICATE
    if (code.status === "used") {
      await VerificationLog.create({
        uic_code,
        name,
        mobile,
        serial_no,
        ip: req.ip,
        result: "duplicate",
      });

      return res.status(409).json({
        success: false,
        message: "Code already used. Product already verified",
      });
    }

    // ✅ VALID FIRST-TIME
    code.status = "used";
    await code.save();

    await VerificationLog.create({
      uic_code,
      name,
      mobile,
      serial_no,
      ip: req.ip,
      result: "valid",
    });

    return res.status(200).json({
      success: true,
      message: "Product verified successfully",
      data: {
        uic_code: code.uic_code,
        SL_No: code.SL_No,
        verifiedAt: new Date(),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};
