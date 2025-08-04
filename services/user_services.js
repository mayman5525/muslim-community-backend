const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user_model");
const nodemailer = require("nodemailer");
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,       
    pass: process.env.GMAIL_APP_PASS    
  }
});

exports.sendResetCode = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("Email not found");

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString(); 
  user.resetCode = resetCode;
  user.resetCodeExpiry = Date.now() + 10 * 60 * 1000;
  await user.save();

  await transporter.sendMail({
    from: process.env.GMAIL_USER,
    to: email,
    subject: "Your Password Reset Code for muslim community Account",
    html: `<p>Your password reset code is: <strong>${resetCode}</strong></p>`
  });
};

exports.verifyAndResetPassword = async (email, code, newPassword, confirmPassword) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");
  if (!user.resetCode || user.resetCode !== code) throw new Error("Invalid reset code");
  if (user.resetCodeExpiry < Date.now()) throw new Error("Reset code expired");

  if (newPassword !== confirmPassword) throw new Error("Passwords do not match");

  const hashedPassword = await bcrypt.hash(newPassword, 12);
  user.password = hashedPassword;
  user.resetCode = undefined;
  user.resetCodeExpiry = undefined;
  await user.save();
};