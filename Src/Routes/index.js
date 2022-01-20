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

// Posts
router.get("/post", getPosts);
router.put("/post", updatePosts);
router.get("/post/:user", getPostUsers);
router.delete("/post/:user", deletePosts);
//Users
router.post("/user", createUsers);
router.get("/users", getUsers);
router.get("/user/:id", getUsersById);
router.delete("/user/:id", deleteUser);
router.post("/user/restore");
router.put("/user/:id");

//Products
router.get("/products?name");
router.get("/products");
router.post("/products");
router.put("/products/id");
router.delete("/prodcts/:id");

module.exports = router;
