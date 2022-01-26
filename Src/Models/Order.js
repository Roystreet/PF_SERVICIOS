const sequelize = require("../Database/index");
const { DataTypes } = require("sequelize");
const Post = require("./Post");
const User = require("./User");

const Order = sequelize.define("Order", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  delivery_adress: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
});

Order.belongsToMany(User, { through: "OrderUser" });
User.belongsToMany(Order, { through: "OrderUser" });

Order.belongsToMany(Post, { through: "OrderPost" });
Post.belongsToMany(Order, { through: "OrderPost" });

module.exports = Order;
