const { response } = require("express");

const userModel = require("../models/User");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) {
  try {
    const { name, email, password, profile_pic } = req.body;
    const checkEmail = await userModel.findOne({ email });
    if (checkEmail) {
      return res
        .status(400)
        .json({ message: "Email already exists", error: true });
    }
    //* Hashing of password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const payLoad = {
      name,
      email,
      profile_pic,
      password: hashedPassword,
    };
    const user = new userModel(payLoad);
    const userSave = await user.save();

    return res.status(200).json({
      message: "user Created successfully",
      data: userSave,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
}

module.exports = registerUser