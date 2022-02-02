const sequelize = require("../Database");
const { DataTypes } = require("sequelize");

const OrderDetail = sequelize.define("OrderDetail", {
  amount: { type: DataTypes.INTEGER, allowNull: false },
});

module.exports = OrderDetail;
