const userModel = require("../models/user.model");

const home = (req, res) => {
  res.status(200).json({ message: "login successful" });
};

const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password) {
      return res.status(422).json({ message: "Fill all the data and try again !..." });
    }

    await userModel.create({ name, username, email, password });
    return res.status(200).json({ message: "User Registered Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { home, signup };
