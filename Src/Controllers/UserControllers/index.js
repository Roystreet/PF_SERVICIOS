// Users
const User = require("../../Models/User");
const Country = require("../../Models/Country");

const getUsers = async (req, res) => {
  const users = await User.findAll({
    include: Country,
  });
  res.status(200).json(users);
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(typeof id);
    const user = await User.findByPk(parseInt(id), { include: Country });
    console.log(user);

    if (user) return res.status(200).json(user);
    return res.status(404).json({ msg: "User not found" });
  } catch (err) {
    console.log(err);
  }
};

const createUsers = async (req, res) => {
  try {
    const {
      username,
      first_name,
      last_name,
      email,
      phone,
      dni,
      country,
      password,
    } = req.body;

    const user = await User.create({
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      dni: dni,
      password: password,
      countryId: country,
    });

    console.log("usuario creado");

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const updateUsers = async (req, res) => {};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    await User.destroy({ where: { id: id } });

    res.status(200).json({ msg: "  delete success" });
  } catch (err) {
    console.log(err);
  }
};

const resetPassword = async (req, res) => {};

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUser,
  resetPassword,
  getUsersById,
};
