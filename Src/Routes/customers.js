const router = require("express").Router();
const { getOrderUser } = require("../Controllers/OrderControllers");
const { createQuestion, replyQuestion, deleteQuestion } = require("../Controllers/QuestionController");

router.get("/order-user", getOrderUser);
router.post("/question",createQuestion)
router.put("/question",replyQuestion)
router.delete("/question/:id",deleteQuestion)
module.exports = router;
