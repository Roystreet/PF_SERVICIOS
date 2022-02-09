const sequelize = require("../database");
const { DataTypes } = require("sequelize");
const Post = require("./Post");
const Order = require("./Order");

const OrderDetail = sequelize.define("OrderDetail", {
  amount: { type: DataTypes.INTEGER, allowNull: false },
});

Post.hasMany(OrderDetail, { foreignKey: "PostId" });
OrderDetail.belongsTo(Post);

Order.hasMany(OrderDetail, { foreignKey: "OrderId" });
OrderDetail.belongsTo(Order);

module.exports = OrderDetail;
