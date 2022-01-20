const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Category = require("./Category");

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

Category.hasMany(Product, {
  foreignKey: "categoryId",
});

Product.belongsTo(Category);

module.exports = Product;
