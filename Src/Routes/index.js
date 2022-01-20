const router = require("express").Router();
const {
  getPosts,
  getPostUsers,
  updatePosts,
  deletePosts,
} = require("../Controllers/PostControllers");

const {
  getProducts,
  postProduct,
} = require('../Controllers/ProductControllers/index');

// Posts
router.get("/post", getPosts);
router.put("/post", updatePosts);
router.get("/post/:user", getPostUsers);
router.delete("/post/:user", deletePosts);

//products
router.get('/products', getProducts)
router.post('/product',postProduct)

//Users
router.post("/users");
router.post("/user/restore");
router.get("/users");

module.exports = router;
