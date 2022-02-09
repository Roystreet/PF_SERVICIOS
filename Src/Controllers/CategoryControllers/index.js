const Category = require('../../Models/Category');

const getCategories = async (req, res, next) => {
	try {
		const category = await Category.findAll();

		res.status(200).json(category);
	} catch (err) {
		console.error(err);
	}
};
const postCategory = async (req, res, next) => {
	try {
		const { category } = req.body;
		await Category.create({ name: category });
		res.status(200).json({ msg: ' Create successfully' });
	} catch (err) {
		console.error(err);
	}
};
const deleteCategory = async (req, res, next) => {
	try {
		const { id } = req.params;
		
		const data = Category.findByPk(id);
		if (data) {
			await Category.destroy({
				where: {
					id: id
				}
			});
			res.status(200).json({ msg: 'Category deleted successfully' });
		} 
	} catch (err) {
		res.status(400).json({err})
	}
};

module.exports = {
	getCategories,
	postCategory,
	deleteCategory
};
