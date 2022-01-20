const Category = require("../../Models/Category");

const getCategories = async (req, res, next) => {
  try {
    const category = await Category.findAll();
    const data = category.map((data) => {
      return data.name;
    });
    res.status(200).json(data);
  } catch (err) {
    console.error(err);
  }
};
const postCategory = async (req, res, next) => {
  try {
    const { category } = req.body;
    await Category.create({ name: category });
  } catch (err) {
    console.error(err);
  }
};
const deleteCategory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = Category.findById(parseInt(id));
    if (data) {
      await Category.destroy({
        where: {
          id: id,
        },
      });
      res.status(200).json({ msg: "Category deleted successfully" });
    } else {
      res.status(404).json({ msg: "Category not found" });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getCategories,
  postCategory,
  deleteCategory,
};
