const sequelize = require("../Database");
const { DataTypes } = require("sequelize");

const Category = sequelize.define("category", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

// Relacion de categorias

module.exports = Category;
