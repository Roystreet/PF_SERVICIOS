
const sequelize = require("../Database");
const Product = require("./Product.js");
const Country = require("./Country.js");
const Post = require("./Post.js");
const User = require("./User.js");
//
// Country.hasMany(User, {
//   foreignKey: "countryId",
// });
// User.belongsTo(Country);
//
User.hasMany(Post, {
  foreignKey: "userId",
});
Post.belongsTo(User);
<<<<<<< HEAD
=======
//
User.hasMany(Product, {
  foreignKey: "userId",
});
Product.belongsTo(User);

module.exports = {
  ...sequelize.models,
};
>>>>>>> 6225b65f6afbe38a2cae67e07a2070696f5c98d8
