const router = require("express").Router();
const { getCountries } = require("../Controllers/CountryControllers");
const {
  getPosts,
  getPostById,
  getPostUsers,
} = require("../Controllers/PostControllers");
const { createUsers, logIn } = require("../Controllers/UserControllers");
const { getCategories } = require("../Controllers/CategoryControllers");
const {
  createPreference,
  feedback,
} = require("../Controllers/MercadoPagoController");

// Country
router.get("/countries", getCountries);
// Post
router.get("/post?name", getPosts);
router.get("/post", getPosts);
router.get("/posts/:id", getPostById);
router.get("/postbyuser/:userId", getPostUsers);
// Users
router.post("/register", createUsers);
router.post("/login", logIn);
// Category
router.get("/category", getCategories);
//
router.post("/checkout", createPreference);
router.get("/feedback", feedback);
module.exports = router;
