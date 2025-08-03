const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth_controller");

router.post("/signup/step1", authController.signupStep1);
router.post("/signup/step2/:userId", authController.signupStep2);
router.post("/signin", authController.signin);
router.post("/reset-password" , authController.resetPassword)
module.exports = router;
