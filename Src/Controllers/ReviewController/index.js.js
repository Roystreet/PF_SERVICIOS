const Post = require("../../Models/Post");
const Review = require("../../Models/Review");

const createReview = async (req, res) => {
  try {
    const review = await Review.create({
      description: req.body.description,
      rating: req.body.rating,
      PostId: req.body.PostId,
      author: req.body.author,
    });
    const data = await Post.findByPk(req.body.PostId, {
      include: [Review]
    })
    data.update({
      ratingProm: data.Reviews.map(item => item.rating).reduce((a, b) => a + b, 0) / data.Reviews.length
    })
    res.status(200).json(data);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "error"
    });
  }
}
const updateReview = async (req, res) => {
  try {
    const {
      id
    } = req.body.PostId;
    const {
      description,
      rating
    } = req.body;
    const review = await Review.findByPk(id);
    if (review) {
      review.update({
        description: description,
        rating: rating,
      });
      const post = Post.findByPk(req.body.PostId, {
        include: [Review]
      })
      post.update({
        ratingProm: post.Reviews.map(item => item.rating).reduce((a, b) => a + b, 0) / post.Reviews.length
      })
      res.status(200).json(review);
    } else {
      res.status(404).json({
        msg: "Review not found"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "error"
    });
  }
}
const deleteReview = async (req, res) => {
  try {
    const id = req.body.PostId;
    const review = await Review.findByPk(id);
    if (review) {
      review.destroy();
      const post = Post.findByPk(req.body.PostId, {
        include: [Review]
      })
      post.update({
        ratingProm: post.Reviews.map(item => item.rating).reduce((a, b) => a + b, 0) / post.Reviews.length
      })
      res.status(200).json({
        msg: "Review deleted"
      });
    } else {
      res.status(404).json({
        msg: "Review not found"
      });
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({
      msg: "error"
    });
  }
}
const getReviewByPost = async (req, res) => {
  try {
    const {id} = req.params;
    const post = await Post.findByPk(id, {
      include: Review
    });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        msg: "Review not found"
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
  createReview,
  updateReview,
  deleteReview,
  getReviewByPost
};