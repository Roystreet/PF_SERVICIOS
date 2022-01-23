const sequelize = require("../Database/index");

const Product = require("./Product");
const User = require("./User");

const Order = sequelize.define("order", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Order;
