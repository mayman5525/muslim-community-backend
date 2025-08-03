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

exports.resetPassword = async(req,res)=>{
    try {
        
    } catch (err) {
        
    }
}
