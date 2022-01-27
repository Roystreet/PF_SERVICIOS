const Post = require("../../Models/Post");
const User = require("../../Models/User");
const Image = require("../../Models/Image");
const Category = require("../../Models/Category");
const { Op } = require("sequelize");
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
        include: [User, Image,Category],
      });
      return res.json(posts);
    }

    const dataFound = await Post.findAll({
      include: [User, Image, Category],
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
		    Category
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
    //body tendrá la forma {title:STRING,description:STRING,status:STRING,stock:NUMBER}
    const updateData = req.body;
    const pk = req.body.id;
    const datFound = await Post.findByPk(pk);
    if (datFound) {
      datFound.update(updateData);
      if (updateData.images) {
        let addingImages = updateData.images.map((link) => {
          return Image.create({
            link: link,
            PostId: pk,
          });
        });
        await Promise.all(addingImages);
        
      }
      if (updateData.categories) {
        let addingCategories = updateData.categories.map((id) => {
          return Category.findByPk(id);
        });
        let categoriesInDB = await Promise.all(addingCategories);
        await addedPost.addCategories(categoriesInDB);
        
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
  const pk = req.params.user;
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
      include: [User, Image,Category],
    });
    res.json(foundPost);
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
