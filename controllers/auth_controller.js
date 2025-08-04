const userService = require("../services/user_services");

exports.signupStep1 = async (req, res) => {
  console.log("Incoming body:", req.body);
  try {
    const user = await userService.createUserStep1(req.body);
    res.status(201).json({ success: true, userId: user._id });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.signupStep2 = async (req, res) => {
  try {
    const user = await userService.completeUserStep2(
      req.params.userId,
      req.body
    );
    res.status(200).json({ success: true, message: "Profile completed", user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.signin = async (req, res) => {
  try {
    const token = await userService.login(req.body.email, req.body.password);
    res.status(200).json({ success: true, token });
  } catch (err) {
    res.status(401).json({ success: false, message: err.message });
  }
};

exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    await userService.sendResetCode(email);
    res.status(200).json({ success: true, message: "Reset code sent to email" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};

exports.confirmResetCode = async (req, res) => {
  try {
    const { email, code, newPassword, confirmPassword } = req.body;
    await userService.verifyAndResetPassword(email, code, newPassword, confirmPassword);
    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
};