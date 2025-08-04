const mongoose = require("mongoose");

const products = new mongoose.Schema({
}, { timestamps: true });

module.exports = mongoose.model("products", products);
