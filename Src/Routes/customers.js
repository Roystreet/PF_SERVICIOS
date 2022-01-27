const router = require("express").Router();
const { getOrderUser } = require("../Controllers/OrderControllers");

router.get("/order-user", getOrderUser);

module.exports = router;
