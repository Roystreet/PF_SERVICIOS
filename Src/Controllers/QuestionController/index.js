const Post = require("../../Models/Post");
const Question = require("../../Models/Question");

const createQuestion = async (req, res) => {
  try {
    //body :{PostId:5, description:"dskjflk asjfdklsalk lskfl"}
    const question = await Question.create(req.body);
    
    res.status(200).json({msg:"Question added",question});
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "error"
    });
  }
}
const replyQuestion = async (req, res) => {
  try {
    const {reply, id}= req.body
    const question = await Question.findByPk(id);
    if (question) {
        question.update({
        reply
      });
      
      res.status(200).json({msg:" Question replied "});
    } else {
      res.status(404).json({
        msg: "Question not found"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "error"
    });
  }
}
const deleteQuestion = async (req, res) => {
  try {
    const {id }= req.params;
    const question = await Question.findByPk(id);
    if (question) {
      question.destroy();
      
      res.status(200).json({
        msg: "Question deleted"
      });
    } else {
      res.status(404).json({
        msg: "Question not found"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "error"
    });
  }
}

module.exports = {
  createQuestion,
  replyQuestion,
  deleteQuestion,
};