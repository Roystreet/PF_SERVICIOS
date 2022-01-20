const router = require("express").Router();
const {
  getPosts,
  getPostUsers,
  updatePosts,
  deletePosts,
} = require("../Controllers/PostControllers");

const { getUsers, getUsersById } = require("../Controllers/UserControllers");
const {} = require("../Controllers/ProductControllers");

// Posts
router.get("/post", getPosts);
router.put("/post", updatePosts);
router.get("/post/:user", getPostUsers);
router.delete("/post/:user", deletePosts);
//Users
router.post("/users");
router.get("/users", getUsers);
router.get("/user", getUsersById);
router.post("/user/restore");
router.delete("/user");
router.put("/user/:id");

//Products
router.get("/products?name");
router.get("/products");
router.post("/products");
router.put("/products/id");
router.delete("/prodcts/:id");

module.exports = router;
