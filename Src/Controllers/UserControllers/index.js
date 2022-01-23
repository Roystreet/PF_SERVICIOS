// Users
const User = require("../../Models/User");
const Country = require("../../Models/Country");
const jwtController = require("../jwtController");
const bcrypt = require("bcrypt");
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);

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

    const hashPassword = await bcrypt.hashSync(password, salt);

    const user = await User.create({
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      phone: phone,
      dni: dni,
      password: hashPassword,
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

const logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    if (user) {
      if (bcrypt.compareSync(password, user.password)) {
        res.status(200).json({ msg: " usuario logueado" });
      } else {
        res.status(403).json({ msg: " Incorrect Password" });
      }
    } else {
      res.status(404).json({ msg: " Username not found" });
    }
  } catch (err) {
    console.log(err);
  }
};

const resetPasswordForce = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    // const user = await User.findOne({ username: username });
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "error" });
  }
};

module.exports = {
  getUsers,
  createUsers,
  updateUsers,
  deleteUser,
  resetPasswordForce,
  getUsersById,
  logIn,
};
