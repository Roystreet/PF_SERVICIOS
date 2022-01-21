const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Product = require("./Product");
const User = require("./User");

const Order = sequelize.define("order", {
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Product.hasMany(Order, {
  foreignKey: "productId",
});
Order.belongsTo(Product);

User.hasMany(Order, {
  foreignKey: "userId",
});

Order.belongsTo(User);

module.exports = Order;
