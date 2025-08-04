const mongoose = require("mongoose");

const groups = new mongoose.Schema({
}, { timestamps: true });

module.exports = mongoose.model("groups", groups);
