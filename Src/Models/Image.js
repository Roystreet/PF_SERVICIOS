const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Post = require("./Post");

const Image = sequelize.define("image", {
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  }
});

Post.hasMany(Image, {
    foreignKey:'postId'
})

Image.belongsTo(Post)

module.exports = Image