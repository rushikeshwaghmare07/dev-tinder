const validator = require("validator");

const validateSignUpData = (req) => {
  const {
    firstName,
    lastName,
    email,
    password,
    age,
    profileUrl,
    skills,
    about,
  } = req.body;

  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required.");
  }

  if (!validator.isEmail(email)) {
    throw new Error("Email is not valid.");
  }

  if (!validator.isStrongPassword(password)) {
    throw new Error(
      "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }

  if (age) {
    if (!validator.isInt(age, { min: 13 })) {
      throw new Error("Age must be a number greater than or equal to 13.");
    }
  }

  if (profileUrl) {
    if (!validator.isURL(profileUrl)) {
      throw new Error("Invalid URL format for profileUrl.");
    }
  }

  if (about) {
    if (!validator.isLength(about, { min: 0, max: 300 })) {
      throw new Error("About section must be between 0 and 300 characters.");
    }
  }

  if (skills) {
    if (skills.length > 20) {
      throw new Error("You can only provide up to 20 skills.");
    }
  }
};

module.exports = {
  validateSignUpData,
};
