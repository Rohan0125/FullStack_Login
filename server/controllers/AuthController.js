const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
  try {
    const { name, dob, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    console.log(existingUser);

    if (existingUser) {
      res.status(200).json({ success: false, message: "User already exists" });
    } else {
      const newUser = new User({ name, dob, email, password });
      await newUser.save();

      res.status(200).json({
        success: true,
        message: "Registration successful",
        user: newUser,
      });
      console.log("new user added" + newUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(201).json({
        success: false,
        message: "you don't have account, please register",
      });
    }
    bcrypt.compare(password, user.password, (err, response) => {
      if (err) {
        console.log(err);
      }
      if (response) {
        const jwt_token = jwt.sign(
          {
            id: user._id,
            email: user.email,
            dob: user.dob,
            created_at: user.created_at,
            token: user.tokens,
          },
          process.env.JWT_SECRET, // Use your own secret key here
          { expiresIn: "5m" }
        );
        res.status(200).json({
          success: true,
          message: "Login successful",
          token: jwt_token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
          },
        });
      } else {
        return res
          .status(201)
          .json({ success: false, message: "Invalid password" });
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server error" });
  }
};

const userInfo = async (req, res) => {
  const token = req.headers.authorization;
  console.log("we are in");
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Verify the JWT token

    // Retrieve user information from the database using the user ID
    const user = await User.findOne({ email: decodedToken.email });
    console.log(user);
    if (!user) {
      return res.status(204).json({ message: "User not found" });
    }

    // Respond with the user information
    res.status(200).json(user);
  } catch (error) {
    console.error("Error decoding token:", error);
    res.status(401).json({ message: "Unauthorized" });
  }
};

module.exports = { register, login, userInfo };
