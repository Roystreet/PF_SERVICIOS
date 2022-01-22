const sequelize = require("../Database/index");
const { DataTypes } = require("sequelize");
const Product = require("./Product");
const User = require("./User");

const Order = sequelize.define("order", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.hasMany;

module.exports = Order;
