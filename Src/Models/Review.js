const sequelize = require("../Database");
const {
  DataTypes
} = require("sequelize");
const Post = require("./Post");

const Review = sequelize.define("Review", {
  description: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  author: {
    type: DataTypes.TEXT,
    allowNull: false
  }

});
Post.hasMany(Review, {
  foreignKey: "PostId",
});
Review.belongsTo(Post);
module.exports = Review;