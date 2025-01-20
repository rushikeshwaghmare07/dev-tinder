const User = require("../models/user.model.js");
const { validateSignUpData } = require("../utils/validator.js");

const userSignup = async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, email, password, age, gender, profileUrl, about, skills } = req.body;

    const existedUser = await User.findOne({ email });
    if (existedUser) {
      return res.status(409).json({
        success: false,
        message: "User is already exists",
      });
    }

    const user = new User({
      firstName,
      lastName,
      email,
      password,
      age,
      gender,
      profileUrl,
      about,
      skills,
    });

    await user.save();
    const token = await user.generateToken();

    res.cookie("token", token, {
      expires: new Date(Date.now() + 8 * 3600000),
    });

    return res.status(201).json({
      success: true,
      message: "User registered successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};

module.exports = {
  userSignup,
};
