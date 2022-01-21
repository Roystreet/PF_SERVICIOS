const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const User = require("../Models/User");
const Post = sequelize.define("post", {
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

User.hasMany(Post, {
  foreignKey: "userId",
});
Post.belongsTo(User);

module.exports = Post;
