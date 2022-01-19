const { DataTypes } = require("sequelize");
const sequelize = require("../database");

sequelize.define("country", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.define("user", {
  first_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  last_name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  dni: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

sequelize.define("post", {
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },

  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  stock: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1,
      max: 100,
    },
  },
});

const { user, post, country } = sequelize.models;
country.hasMany(user, {
  foreignKey: "countryId",
});
user.belongsTo(country);

user.hasMany(post, {
  foreignKey: "userId",
});
post.belongsTo(user);

module.exports = {
  ...sequelize.models,
};
