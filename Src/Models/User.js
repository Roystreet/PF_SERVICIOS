const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Country = require("../Models/Country");

const User = sequelize.define("User", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.TEXT,
  },
  role: {
    type: DataTypes.ENUM("user", "admin", "superAdmin"),
    allowNull: false,
    defaultValue: "user",
  },
});

Country.hasMany(User, {
  foreignKey: "CountryId",
});
User.belongsTo(Country);

module.exports = User;
