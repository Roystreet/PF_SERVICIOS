const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Product = require("./Product");

const Category = sequelize.define("category", {
  name: {
    type: DataTypes.STRING,
  },
});

Product.belongsToMany(Category, { through:'Product_Category'})
Category.belongsToMany(Product, { through:'Product_Category'})

module.exports = Category;
