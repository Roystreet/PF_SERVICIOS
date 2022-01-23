const router = require("express").Router();
const { jwtMiddleware } = require("../Controllers/jwtController/index");
const {
  getPosts,
  getPostUsers,
  updatePosts,
  deletePosts,
  getPostById,
  createPosts
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

// Posts
router.get("/post", getPosts);
router.put("/post", updatePosts);
router.get("/post/:id", getPostUsers);
router.get("/posts/:id", getPostById);
router.delete("/post/:id", deletePosts);
router.post('/post',createPosts )

//Users
router.post("/register", createUsers);
router.get("/users", jwtMiddleware, getUsers);
router.get("/user/:id", getUsersById);
router.delete("/user/:id", deleteUser);
router.post("/user/reset-password-force", resetPasswordForce);
router.put("/user/:id");
router.post("/login", logIn);



// Category
router.get("/category", getCategories);
router.post("/category", postCategory);
router.delete("/category/:id", deleteCategory);
// Ruta para destruir sesión
router.get("/lagout");
//Orders
router.get("/orders", getOrders);
router.get("/order/:id", getOrderId);
router.post("/order");
//counrties

router.get("/countries", getCountries);

router.get("/countries", getCountries);

module.exports = router;
