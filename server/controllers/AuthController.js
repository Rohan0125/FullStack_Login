const User = require("../models/User");

const register = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    const newUser = new User({ name, dob, email, password });
    await newUser.save();
    res.status(201).json({ message: "Registration successful", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const login = async (req, res) => {
  // Implement login logic
  res.status(501).json({ message: "Login endpoint not implemented yet" });
};

module.exports = { register, login };
