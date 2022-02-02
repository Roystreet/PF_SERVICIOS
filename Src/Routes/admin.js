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
const {
  getOrders,
  getOrderId,
  createOrder,
} = require("../Controllers/OrderControllers");
const {
  sendEmail
} = require("../Controllers/SendEmailController");
const {
  createReview,
  updateReview,
  deleteReview,
  getReviewByPost

} = require("../Controllers/ReviewController/index.js");
const {} = require("../Controllers/ReviewController/index.js");

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
router.post("/order", createOrder);
// Route email
router.get("/email", sendEmail);
// Route Review
router.post("/review", createReview)
router.put("/review", updateReview)
router.delete("/review", deleteReview)
router.get("/review/:id", getReviewByPost)


module.exports = router;