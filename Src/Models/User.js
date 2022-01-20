const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Country = require("../Models/Country");
const Product = require("../Models/Product")

const User = sequelize.define("user", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
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
});

Country.hasMany(User, {
  foreignKey: "countryId",
});
User.belongsTo(Country);

module.exports = User;
