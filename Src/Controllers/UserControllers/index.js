// Users
const User = require("../../Models/User");

const getUsers = async (req, res) => {
  const users = await User.findAll();
  res.status(200).json(users);
};

const getUsersById = async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user.length > 0) return res.status(200).json(user);
  return res.status(404).json({ msg: "User not found" });
};

const createUsers = async (req, res) => {};

const updateUsers = async (req, res) => {};

const deleteUser = async (req, res) => {};

const resetPassword = async (req, res) => {};

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUser,
  resetPassword,
  getUsersById,
};
