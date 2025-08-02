const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");

exports.createUserStep1 = async ({ fullName, email, password, confirmPassword, phoneNumber, personalPhoto }) => {
  if (password !== confirmPassword) throw new Error("Passwords do not match");

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = new User({
    fullName,
    email,
    password: hashedPassword,
    phoneNumber,
    personalPhoto
  });

  return await user.save();
};

exports.completeUserStep2 = async (userId, { skills, customSkills, bio, role, businessPhoto, agreedToTerms }) => {
  if (!agreedToTerms) throw new Error("Terms must be accepted");

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.skills = skills || [];
  user.customSkills = customSkills || [];
  user.bio = bio || "";
  user.role = role;
  user.businessPhoto = role === "business owner" ? businessPhoto : undefined;
  user.agreedToTerms = agreedToTerms;

  return await user.save();
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");

  const token = jwt.sign(
    { userId: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return token;
};
