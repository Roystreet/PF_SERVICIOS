const router = require("express").Router();
const axios = require('axios');
const { getCountries } = require("../Controllers/CountryControllers");
const decode = require('jwt-decode');
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
const { GoogleAuth } = require("../Controllers/AuthGoogleController");

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
//loginGOOGLE
router.post("/auth/google/callback", GoogleAuth)
//deocerjwt
router.post("/decoderGoogle", GoogleAuth)
//
module.exports = router;
