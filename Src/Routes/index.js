const router = require('express').Router();
const { getPosts, getPostUsers, updatePosts, deletePosts } = require('../Controllers/PostControllers');

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

//products
router.get('/products', getProducts)
router.post('/product',postProduct)
router.get('/products/:id',getProductById)
router.put('/product',updateProduct)
router.delete('/product/:id',deleteProduct)

//Users
router.post('/users');
router.post('/user/restore');
router.get('/users');

module.exports = router;
