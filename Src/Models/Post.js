const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Category = require("./Category");
const User = require("./User");

const Post = sequelize.define("Post", {
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
User.hasMany(Post, {
  foreignKey: "userId",
});
Post.belongsTo(User);

Category.hasMany(Post, {
  foreignKey: "categoryId",
});

Post.belongsTo(Category);

module.exports = Post;
