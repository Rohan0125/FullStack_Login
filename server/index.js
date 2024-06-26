const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const authRoutes = require("./routes/Auth");

const app = express();
const PORT = process.env.PORT || 5000;
require("dotenv").config();

// Middleware
app.use(bodyParser.json());
app.use(cors());

const usernameDB = process.env.dbuname;
const passwordDB = process.env.dbpass;
const URI = `mongodb+srv://${usernameDB}:${passwordDB}@cluster0.ft4ihpm.mongodb.net/`;

mongoose
  .connect(URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.get("/", (req, res) => {
  res.send("hello there");
});
app.use("/api", authRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
