const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    // Step 1
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNumber: { type: String },
    personalPhoto: { type: String },

    // Step 2
    skills: {
      type: [String],
      enum: ["Design", "media", "Marketing", "Writing"],
      default: [],
    },
    customSkills: [{ type: String }],
    bio: { type: String },
    role: {
      type: String,
      enum: ["individual", "non profit organization", "business owner"],
      required: false,
    },
    businessPhoto: { type: String },
    agreedToTerms: { type: Boolean, required: true, default: false },
    resetCode: { type: String },
    resetCodeExpiry: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
