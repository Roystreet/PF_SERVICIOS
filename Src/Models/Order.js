const sequelize = require("../Database/index");
const {DataTypes} = require("sequelize")



const Post = require("./Post");
const User = require("./User");

const Order = sequelize.define("order", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});


module.exports = Order;
