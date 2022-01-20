const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const User = require('./User.js')
const Product = sequelize.define("product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: null,
  },
  price: {
    type: DataTypes.DECIMAL,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
});
User.hasMany(Product, {
  foreignKey: "userId",
});
Product.belongsTo(User);
module.exports = Product;
