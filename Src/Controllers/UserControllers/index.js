// Users
const User = require("../../Models/User");
const Country = require("../../Models/Country");
const { generateToken } = require("../jwtController");
const bcrypt = require("bcryptjs");
const saltRound = 10;
const salt = bcrypt.genSaltSync(saltRound);
const { emailRegister } = require("../SendEmailController");

const getUsers = async (req, res) => {
  const users = await User.findAll({
    include: Country,
  });
  res.status(200).json(users);
};

const getUsersById = async (req, res) => {
  try {
    const { id } = req.params;
    // console.log(typeof id);
    const user = await User.findByPk(parseInt(id), { include: Country });
    //console.log(user);

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
      image,
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
      CountryId: country,
      image: image,
    });

    console.log("user created");
    await emailRegister(email);

    res.status(200).json(user);
  } catch (err) {
    console.log(err);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { id } = req.params;
    const { input, type } = req.body;
    const data = await User.findByPk(id, {
      include: [Country],
    });

    switch (type) {
      case "NAME":
        data.update({
          first_name: input,
        });
        break;
      case "LASTNAME":
        data.update({
          last_name: input,
        });
        break;
      case "USERNAME":
        data.update({
          username: input,
        });
        break;
      case "DNI":
        data.update({
          dni: input,
        });
        break;
      case "EMAIL":
        data.update({
          email: input,
        });
        break;
      case "PHONE":
        data.update({
          phone: input,
        });
        break;
      case "ROLE":
        data.update({
          role: input,
        });
        break;
      case "PASSWORD":
        const hashPassword = await bcrypt.hashSync(input, salt);
        data.update({
          password: hashPassword,
        });
        break;
      case "IMAGE":
        data.update({
          image: input,
        });
        break;
      // Also missing country section, pending if country can or can not be changed
      default:
        break;
    }
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "error",
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const data = await User.findByPk(id);
    data.update({
      status: false,
    });

    res.status(200).json({ msg: "change success" });
  } catch (err) {
    console.log(err);
  }
};

const logIn = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ where: { username: username } });

  if (user) {
    if (bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        msg: "user logged",

        token: generateToken({ username: username, rol: user.role }),
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        rol: user.role,
      });
    } else {
      res.json({ msg: "Wrong Password" });
    }
  } else {
    res.json({ msg: "Username not found" });
  }
};

const resetPasswordForce = async (req, res) => {
  // console.log(req.body);
  try {
    const { id, password } = req.body;

    const user = await User.findByPk(id);

    if (user) {
      const hashPassword = await bcrypt.hashSync(password, salt);
      await User.update(
        { password: hashPassword },
        {
          where: {
            username: user,
          },
        }
      );
      res.status(200).json({ msg: "Password Restore " });
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(404).json({ msg: "error " });
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
