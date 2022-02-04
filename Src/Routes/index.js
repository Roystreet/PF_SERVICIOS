const router = require("express").Router();
const admin = require("./admin");
const customer = require("./customers");
const public = require("./public");
const { jwtMiddleware } = require("../Controllers/jwtController/index");

router.use("/", public);
router.use("/customer", jwtMiddleware, customer);
router.use("/admin", admin);

module.exports = router;
