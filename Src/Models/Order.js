const sequelize = require("../Database/index");
const { DataTypes } = require("sequelize");
const Post = require("./Post");
const User = require("./User");

const Order = sequelize.define("Order", {
  delivery_adress: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN,
  },
});

User.hasMany(Order, { foreignKey: "UserId" });

Order.belongsTo(User);

Order.belongsToMany(Post, { through: "OrderPost" });
Post.belongsToMany(Order, { through: "OrderPost" });

module.exports = Order;
