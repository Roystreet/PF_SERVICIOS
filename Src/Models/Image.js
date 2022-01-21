const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Product = require("./Product");

const Image = sequelize.define("image", {
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

Product.hasMany(Image, {
    foreignKey:'productId'
})

Image.belongsTo(Product)

module.exports = Image