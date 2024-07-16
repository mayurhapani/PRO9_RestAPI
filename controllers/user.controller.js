const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const getUser = async (req, res) => {
  const users = await userModel.find({});
  res.status(200).json({ users });
};

const signup = async (req, res) => {
  try {
    const { name, username, email, password } = req.body;

    if (!name || !username || !email || !password)
      return res.status(422).json({ message: "Fill all the data and try again !..." });

    const existingUser = await userModel.findOne({ $or: [{ email: email, username: username }] });
    if (existingUser) return res.status(422).json({ message: "Username or Email Already exist" });

    const hashPassword = await bcrypt.hash(password, 10);
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

    const user = await userModel.findOne({ email });
    if (!user)
      return res.status(422).json({ message: "Email or Password wrong Please try again !..." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(422).json({ message: "Email or Password wrong Please try again !..." });

    const Token = jwt.sign(email, "secret");
    res.cookie("token", Token);
    return res.status(200).json({ message: "User login Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await userModel.findOneAndDelete({ _id: id });

    return res.status(200).json({ message: "User Deleted Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const editUser = async (req, res) => {
  try {
    const { name, username, email } = req.body;
    const { id } = req.params;

    if (!name || !username || !email)
      return res.status(422).json({ message: "Fill all the data and try again !..." });

    await userModel.findOneAndUpdate(
      { _id: id },
      {
        name,
        username,
        email,
      }
    );
    return res.status(200).json({ message: "User Edit Successfully!" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

module.exports = { getUser, signup, signin, editUser, deleteUser };
