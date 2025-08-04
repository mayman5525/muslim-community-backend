const mongoose = require("mongoose");

const events = new mongoose.Schema({}, { timestamps: true });

module.exports = mongoose.model("events", events);
