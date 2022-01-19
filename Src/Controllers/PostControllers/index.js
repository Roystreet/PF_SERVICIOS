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
const updatePosts = (req, res, next) => {};

const deletePosts = (req, res, next) => {};

module.exports = {
	getPosts,
	getPostUsers,
	updatePosts,
	deletePosts
};
