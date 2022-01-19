const { DataTypes } = require("sequelize");
const sequelize = require("../Database");

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

sequelize.define("product", {
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

const { user, post, country, product } = sequelize.models;

country.hasMany(user, {
  foreignKey: "countryId",
});
user.belongsTo(country);

user.hasMany(post, {
  foreignKey: "userId",
});
post.belongsTo(user);

user.hasMany(product, {
  foreignKey: "productId",
});
product.belongsTo(user);

module.exports = {
  ...sequelize.models,
};
