const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Country = require("../Models/Country");

const User = sequelize.define("User", {
  first_name: {
    type: DataTypes.STRING,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
  },
  dni: {
    type: DataTypes.STRING,
  
    unique: true,
  },
  phone: {
    type: DataTypes.STRING,
  },
  image: {
    type: DataTypes.TEXT,
  },
  role: {
    type:DataTypes.ENUM("user","admin","superAdmin"),
    allowNull:false,
    defaultValue:"user"
  },
  status:{
    type: DataTypes.BOOLEAN,
    allowNull:false,
    defaultValue:true
  }
});

Country.hasMany(User, {
  foreignKey: "CountryId",
});
User.belongsTo(Country);

module.exports = User;
