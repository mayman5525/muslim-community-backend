const mongoose = require("mongoose");
require("dotenv").config();

const initDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log(" MongoDB connected");



  } catch (err) {
    console.error(" Failed to connect to MongoDB:", err);
    process.exit(1);
  }
};

module.exports = initDb;
