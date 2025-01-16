const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 20,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  age: {
    type: String,
  },
  gender: {
    type: String,
    enum: ["male", "female", "others"]
  },
  profileUrl: {
    type: String,
  },
  about: {
    type: String,
  },
  skills: {
    type: [String],
    minLength: 10,
  },
});

module.exports = mongoose.model("User", userSchema);
