const Post = require("../../Models/Post");
const User = require("../../Models/User");
const Image = require("../../Models/Image");
const Category = require("../../Models/Category");
const { Op } = require("sequelize");
const  { CategoryPost}  = require("../../Models/index.js").models;
const Question = require("../../Models/Question");

const getPosts = async (req, res, next) => {
  try {
    let { name } = req.query;
    if (name) {
      let posts = await Post.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
        include: [User, Image,Category, Question],
      });
      return res.json(posts);
    }

    const dataFound = await Post.findAll({
      include: [User, Image, Category, Question],
    });
    res.status(200).json(dataFound);
    return;
  } catch (error) {
    res.status(500).json({ msg: "error" });
    console.log("Error", Error);
    return;
  }
};
async function createPosts(req, res) {
  try {
    let post = req.body; //en el body ya se incluye el UserId
    let addedPost = await Post.create({
      ...post,
    });
    if(post.images){
      let addingImages = post.images.map((link) => {
        return Image.create({
          link: link,
          PostId: addedPost.id,
        });
      });
      await Promise.all(addingImages);

    }

    if(post.categories){
      let addingCategories = post.categories.map((id) => {
        return Category.findByPk(id);
      });
      let categoriesInDB = await Promise.all(addingCategories);
      await addedPost.addCategories(categoriesInDB)

    }


    res.status(201).json(addedPost);
  } catch (err) {
    res.status(400).send("error. Verify request data");
    console.log(err);
  }
}
const getPostUsers = async (req, res, next) => {
  const params = req.params.userId;
  try {
    const dataFound = await Post.findAll({
      include: [
        {
          model: User,
          where: {
            id: params,
          },
        },
        Image,
		    Category,
        Question
      ],
    });
    res.status(200).json(dataFound);
    return;
  } catch (error) {
    console.log("Error: ", Error);

    res.status(400).json();
  }
};

const updatePosts = async (req, res, next) => {
  try {
    //asumiendo una llave primaria id

    const updateData = req.body;
    const pk = req.body.id;
    //destroy category relation because after that it adds categories
    CategoryPost.findAll({
      where:{
         PostId:pk
      }
    })
    .then(relation=>{
      return relation.map(r=>r.destroy())
    })

    Image.findAll({
      where:{
         PostId:pk
      }
    })
    .then(imgs=>{
      return imgs.map(i=>i.destroy())
    })

    const datFound = await Post.findByPk(pk);
    if (datFound) {
      datFound.update(updateData);
      if (updateData.Images) {
        let addingImages = updateData.Images.map((link) => {
          return Image.create({
            link: link,
            PostId: pk,
          });
        });
        await Promise.all(addingImages);

      }
      if (updateData.Categories) {
        let addingCategories = updateData.Categories.map((id) => {
          return Category.findByPk(id);
        });
        let categoriesInDB = await Promise.all(addingCategories);
        await datFound.addCategories(categoriesInDB);

      }

      res.status(200).json({ msg: "post update" });
      return;
    } else {
      res.status(400).json({ msg: "el post no existe" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error" });
  }
};

const deletePosts = async (req, res, next) => {
  //asumiendo llave primaria id
  const pk = req.params.id;
  console.log(pk);
  try {
    const datFound = await Post.findByPk(pk);
    if (datFound) {
      datFound.destroy();
      res.status(200).json({ msg: "Post Destroyed" });
      return;
    }
    res.status(400).json({ msg: "post not found" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error });
  }
};

async function getPostById(req, res) {
  try {
    let { id } = req.params;
    let foundPost = await Post.findByPk(id, {
      include: [User, Image,Category,Question],
    });
    if(foundPost) return res.json(foundPost);
    res.status(400).json({msg:'post Not found'})
  } catch (err) {
    console.log(err);
  }
}
module.exports = {
  getPosts,
  getPostUsers,
  updatePosts,
  deletePosts,
  createPosts,
  getPostById,
};
