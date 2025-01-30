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

const validateUpdateProfileData = (req) => {
  const { firstName, lastName, email, age, profileUrl, about, skills } =
    req.body;

  const allowedUpdateFiled = [
    "firstName",
    "lastName",
    "age",
    "gender",
    "profileUrl",
    "about",
    "skills",
  ];

  const isAllowed = Object.keys(req.body).every((field) =>
    allowedUpdateFiled.includes(field)
  );

  if (isAllowed) {
    return isAllowed;
  }

  if (firstName && !validator.isLength(firstName, { min: 2, max: 20 })) {
    throw new Error("First name must be between 2 and 20 characters.");
  }

  if (lastName && !validator.isLength(lastName, { min: 2, max: 20 })) {
    throw new Error("Last name must be between 2 and 20 characters.");
  }

  if (email && !validator.isEmail(email)) {
    throw new Error("Email is not valid.");
  }

  if (age && !validator.isInt(String(age), { min: 13 })) {
    throw new Error("Age must be a number greater than or equal to 13.");
  }

  if (profileUrl && !validator.isURL(profileUrl)) {
    throw new Error("Invalid URL format for profileUrl.");
  }

  if (about && !validator.isLength(about, { max: 300 })) {
    throw new Error("About section must be between 0 and 300 characters.");
  }

  if (skills) {
    if (!Array.isArray(skills) || skills.length > 20) {
      throw new Error("You can only provide up to 20 skills.");
    }
  }

  return true;
};

const validatePassword = (req) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    throw new Error("All fields are required");
  }

  if (newPassword && !validator.isStrongPassword(newPassword)) {
    throw new Error(
      "Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
    );
  }
};

module.exports = {
  validateSignUpData,
  validateUpdateProfileData,
  validatePassword,
};
