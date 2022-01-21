const Post = require('../../Models/Post');
const Product = require('../../Models/Product');
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
const createPosts = async (req, res, next) => {
	//forma json recibido {userId:?????,title:STRING,description:STRING,status:BOOLEAN,stock:NUMBER}
	//id del producto
	const { id } = req.params;
	//debe recibir req.body.userId
	try {
		const datadFound = await Product.findByPk(id);
		if (datadFound) {
			await Post.create({
				title: req.body.title,
				description: req.body.description,
				productId: id,
				userId: req.body.userId,
				stock: req.body.stock,
				status: req.body.status
			});
			res.status(200).json({ msg: 'post created' });
			return;
		}
		res.status(400).json({ msg: 'product not found' });
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: error });
	}
};
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

module.exports = {
	getPosts,
	getPostUsers,
	updatePosts,
	deletePosts,
	createPosts
};
