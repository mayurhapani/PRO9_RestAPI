const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

const home = (req, res) => {
  res.status(200).json({ message: "login successful" });
};

const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password)
      return res.status(422).json({ message: "Fill all the data and try again !..." });

    const existingUser = await userModel.findOne({ $or: [{ email: email, username: username }] });
    if (existingUser) return res.status(422).json({ message: "Username or Email Already exist" });

    const hashPassword = bcrypt.hash(password, 10);
    await userModel.create({
      name,
      username,
      email,
      password: hashPassword,
    });
    return res.status(200).json({ message: "User Registered Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(422).json({ message: "Fill all the data and try again !..." });

    const user = await userModel.create({ email });
    if (!user)
      return res.status(422).json({ message: "Email or Password wrong Please try again !..." });

    return res.status(200).json({ message: "User Registered Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { home, signup, signin };
