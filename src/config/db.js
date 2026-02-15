const mongoose = require("mongoose");

// config/db.js
// config/db.js  (or wherever connectDB is)
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "medicine_auth",           // ← force this database
      retryWrites: true,
      w: "majority",
    });

    console.log(`✅ Connected to database: ${mongoose.connection.db.databaseName}`);
    console.log(`Collection used: ${mongoose.model("UicCode").collection.collectionName}`);
  } catch (error) {
    console.error("❌ Connection failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
