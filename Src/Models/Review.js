const sequelize = require("../Database");
const {
  DataTypes
} = require("sequelize");
const Post = require("./Post");

const Review = sequelize.define("Review", {
  description: {
    type: DataTypes.STRING,
  },
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

});
Post.hasMany(Review, {
  foreignKey: "PostId",
});
Review.belongsTo(Post);
module.exports = Review;