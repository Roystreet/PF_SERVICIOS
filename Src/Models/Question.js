const sequelize = require("../database");
const {
  DataTypes
} = require("sequelize");
const Post = require("./Post");

const Question = sequelize.define("Question", {
  description: {
    type: DataTypes.TEXT,
    unique:true 
  },
  reply: {
    type: DataTypes.TEXT

  },

});
Post.hasMany(Question, {
  foreignKey: "PostId",
});
Question.belongsTo(Post);
module.exports = Question;
