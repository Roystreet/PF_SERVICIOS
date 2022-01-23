let Product = require("../../Models/Product");
let User = require("../../Models/User");
let Category = require("../../Models/Category");
let Image = require("../../Models/Image");
const { Op } = require("sequelize");

async function getProducts(req, res) {
  try {
    let { name } = req.query;
    if (name) {
      let products = await Product.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`,
          },
        },
      });
      return res.json(products);
    }
    let products = await Product.findAll({
      limit: 100,
      include: Category,
    });
    res.json(products);
  } catch (error) {
    console.log(error);
    res.status(400).send("error");
  }
}


async function postProduct(req, res) {
  try {
    let product = req.body; //en el body ya se incluye el userId
    let addedProduct = await Product.create({
      ...product,
    });
    let addingImages = product.images.map(link=>{
          return Image.create({
            link:link,
            productId:addedProduct.id
          })
    })
    await Promise.all(addingImages)
    res.status(201).json(addedProduct);
  } catch (err) {
    res.status(400).send("error. Verify request data");
    console.log(err);
  }
}

async function updateProduct(req, res, next) {
  try {
    //
    const updateData = req.body.data;
    const pk = req.body.id;
    const foundProduct = await Product.findByPk(pk);
    if (foundProduct) {
      foundProduct.update(updateData);
      return res.status(200).json({ msg: "product update" });
    } else {
      res.status(400).json({ msg: "product not found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error" });
  }
}

async function deleteProduct(req, res) {
  try {
    const { id } = req.params;
    const datFound = await Product.findByPk(id);
    if (datFound) {
      datFound.destroy();
      return res.status(200).json({ msg: "Product Destroyed" });
    }
    res.status(400).json(id);
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: "error" });
  }
}

module.exports = {
  getProducts,
  postProduct,
  getProductById,
  deleteProduct,
  updateProduct,
};
