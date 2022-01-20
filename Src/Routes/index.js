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
const {} = require("../Controllers/ProductControllers");

const {
  getProducts,
  postProduct,
  getProductById,
  updateProduct,
  deleteProduct
} = require('../Controllers/ProductControllers/index');

// Posts
router.get("/post", getPosts);
router.put("/post", updatePosts);
router.get("/post/:user", getPostUsers);
router.delete("/post/:user", deletePosts);
<<<<<<< HEAD

//products
router.get('/products', getProducts)
router.post('/product',postProduct)
router.get('/products/:id',getProductById)
router.put('/product',updateProduct)
router.delete('/product/:id',deleteProduct)

=======
>>>>>>> 6225b65f6afbe38a2cae67e07a2070696f5c98d8
//Users
router.post("/register", createUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUsersById);
router.delete("/user/:id", deleteUser);
router.post("/user/restore");
router.put("/user/:id");
router.post("/login");
//Products
router.get("/products?name");
router.get("/products");
router.post("/products");
router.put("/products/id");
router.delete("/prodcts/:id");
// Ruta para destruir sesión
router.get("/lagout");

module.exports = router;
