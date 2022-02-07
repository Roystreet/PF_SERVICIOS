const sequelize = require("../Database");
const {
  DataTypes
} = require("sequelize");
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
  ratingProm: {
    type: DataTypes.DECIMAL,
    defaultValue: 0,
  },
  status: {
    type: DataTypes.BOOLEAN, // TODO: estado del porducto nuevo/usado?
    defaultValue: true,
  },
  postStatus:{
    type:DataTypes.ENUM('Activo','Inactivo'),
    defaultValue:'Inactivo',
    allowNull:false,
  }
});
User.hasMany(Post, {
  foreignKey: "UserId",
});
Post.belongsTo(User);

Category.belongsToMany(Post, {
  through: "CategoryPost",
});

Post.belongsToMany(Category, {
  through: "CategoryPost",
});

module.exports = Post;
