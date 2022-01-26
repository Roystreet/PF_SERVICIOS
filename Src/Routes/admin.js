const router = require("express").Router();
const {
  getPostUsers,
  updatePosts,
  deletePosts,
  getPostById,
  createPosts,
} = require("../Controllers/PostControllers");
const {
  getUsers,
  getUsersById,
  deleteUser,
  createUsers,
  resetPasswordForce,
} = require("../Controllers/UserControllers");
const {
  postCategory,
  deleteCategory,
} = require("../Controllers/CategoryControllers");
const { getOrders, getOrderId } = require("../Controllers/OrderControllers");

// Route for Post
router.put("/post", updatePosts);
router.delete("/post/:id", deletePosts);
router.post("/post", createPosts);
// Route for Users
router.get("/users", getUsers);
router.get("/user/:id", getUsersById);
router.delete("/user/:id", deleteUser);
router.put("/user/reset-password-force", resetPasswordForce);
router.put("/user/:id");
router.post("/user", createUsers);
// Route for Category
router.post("/category", postCategory);
router.delete("/category/:id", deleteCategory);
// Route Orders
router.get("/orders", getOrders);
router.get("/order/:id", getOrderId);

module.exports = router;