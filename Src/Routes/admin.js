const router = require("express").Router();
const {
  getPosts,
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
  logIn,
  resetPasswordForce,
} = require("../Controllers/UserControllers");
const {
  getCategories,
  postCategory,
  deleteCategory,
} = require("../Controllers/CategoryControllers");
const { getOrders, getOrderId } = require("../Controllers/OrderControllers");
const { getCountries } = require("../Controllers/CountryControllers");

// Route for Post
router.get("/post?name", getPosts);
router.get("/post", getPosts);
router.put("/post", updatePosts);
router.get("/postbyuser/:userId", getPostUsers);
router.get("/posts/:id", getPostById);
router.delete("/post/:id", deletePosts);
router.post("/post", createPosts);
// Route for Users
router.post("/register", createUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUsersById);
router.delete("/user/:id", deleteUser);
router.post("/user/reset-password-force", resetPasswordForce);
router.put("/user/:id");
router.post("/login", logIn);

// Route for Category

router.get("/category", getCategories);
router.post("/category", postCategory);
router.delete("/category/:id", deleteCategory);

// Route Orders

router.get("/orders", getOrders);
router.get("/order/:id", getOrderId);
router.post("/order");

// Route

router.get("/countries", getCountries);

module.exports = router;
