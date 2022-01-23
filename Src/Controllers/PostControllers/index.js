const Post = require('../../Models/Post');
const User = require('../../Models/User');

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
		  });
		  return res.json(posts);
		}

		const dataFound = await Post.findAll({});
		res.status(200).json(dataFound);
		return;
	} catch (error) {
		res.status(500).json({ msg: [ error ] });
		console.log('Error', Error);
		return;
	}
};
async function createPosts(req, res) {
	try {
	  let post = req.body; //en el body ya se incluye el userId
	  let addedPost = await Post.create({
		...post,
	  });
	  let addingImages = addedPost.images.map(link=>{
			return Image.create({
			  link:link,
			  postId:addedPost.id
			})
	  })
	  await Promise.all(addingImages)
	  res.status(201).json(addedPost);
	} catch (err) {
	  res.status(400).send("error. Verify request data");
	  console.log(err);
	}
  }
const getPostUsers = async (req, res, next) => {
	const params = req.params.user;
	try {
		const dataFound = await Post.findAll({
			include: {
				model: User,
				where: {
					id: params
				}
			}
		});
		res.status(200).json(dataFound);
		return;
	} catch (error) {
		console.log('Error: ', Error);

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
			res.status(200).json({ msg: 'post update' });
			return;
		} else {
			res.status(400).json({ msg: 'el post no existe' });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error });
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
			res.status(200).json({ msg: 'Post Destroyed' });
			return;
		}
		res.status(400).json({ msg: 'post not found' });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error });
	}
};

async function getPostById(req, res) {
	try {
	  let { id } = req.params;
	  let foundPost = await Post.findByPk(id, {
		include: Category,
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
	getPostById
};
