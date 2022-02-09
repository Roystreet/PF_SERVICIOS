const sequelize = require("../database");
const { DataTypes } = require("sequelize");

const Country = sequelize.define("Country", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Country;
