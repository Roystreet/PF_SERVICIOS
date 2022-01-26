const sequelize = require("../Database");
const { DataTypes } = require("sequelize");
const Post = require("./Post");

const Image = sequelize.define("Image", {
  link: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

Post.hasMany(Image, {
  foreignKey: "PostId",
});

Image.belongsTo(Post);

module.exports = Image;
