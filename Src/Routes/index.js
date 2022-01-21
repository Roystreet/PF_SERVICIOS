const router = require("express").Router();
const {
  getPosts,
  getPostUsers,
  updatePosts,
  deletePosts,
} = require("../Controllers/PostControllers");

const {
  getUsers,
  getUsersById,
  deleteUser,
  createUsers,
} = require("../Controllers/UserControllers");

const {
  getProducts,
  postProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../Controllers/ProductControllers/index");
const {
  getCategories,
  postCategory,
  deleteCategory,
} = require("../Controllers/CategoryControllers");

const { getOrders, getOrderId } = require("../Controllers/OrderControllers");

// Posts
router.get("/post", getPosts);
router.put("/post", updatePosts);
router.get("/post/:id", getPostUsers);
router.delete("/post/:id", deletePosts);

//Users
router.post("/register", createUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUsersById);
router.delete("/user/:id", deleteUser);
router.post("/user/restore");
router.put("/user/:id");
router.post("/login");

//Products
router.get("/products?name", getProducts);
router.get("/products", getProducts);
router.post("/product", postProduct);
router.put("/product", updateProduct);
router.delete("/product/:id", deleteProduct);

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

module.exports = router;
