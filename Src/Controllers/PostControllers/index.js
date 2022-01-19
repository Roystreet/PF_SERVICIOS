const Post = require('../../Models/Post');
const User = require('../../Models/User');

const getPosts = async (req, res, next) => {
	try {
		const dataFound = await Post.findAll({});
		res.status(200).json(dataFound);
		return;
	} catch (error) {
		res.status(500).json({ msg: [ error ] });
		console.log('Error', Error);
		return;
	}
};
const getPostUsers = async (req, res, next) => {
	const params = req.params;
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
		res.status(500).json();
		console.log('Error: ', Error);
	}
};
const updatePosts = async (req, res, next) => {
	try {
		//asumiendo una llave primaria id
		//body tendrá la forma {title:STRING,description:STRING,status:STRING,stock:NUMBER}
		const updateData = req.body.data;
		const pk = req.body.id;
		const datFound = await Post.findByPk(pk);
		if (datFound) {
			datFound.update(updateData);
			res.status(200).json({ msg: 'post update' });
			return;
		} else {
			res.status(400).json({ msg: 'el producto no existe' });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error });
	}
};

const deletePosts = async (req, res, next) => {
	//asumiendo llave primaria id
	try {
		const pk = req.body.pk;
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

module.exports = {
	getPosts,
	getPostUsers,
	updatePosts,
	deletePosts
};
