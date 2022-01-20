
let Product =require('../../Models/Product')
let User =require('../../Models/User')



async function getProducts (req, res){

    try {
     let products = await Product.findAll({limit:15})
     res.json(products)

    } catch (error) {
        console.log(error)
        res.status(400).send('error')
    }


}
async function getProductById(req,res) {
  try {
    let {id} = req.params
    let foundProduct= await Product.findByPk(id)
    res.json(foundProduct)
  } catch (err) {
    console.log(err)
  }
}

async function postProduct (req,res){
    try {

        let product = req.body; //en el body ya se incluye el userId
        let addedProduct = await Product.create({
            ...product
        })
        res.status(201).json(addedProduct)

    } catch (err) {
        res.status(400).send('error. Verify request data');
        console.log(err)
    }
}


async function updateProduct (req, res, next) {
	try {
		//
		const updateData = req.body.data;
		const pk = req.body.id;
		const foundProduct = await Product.findByPk(pk);
		if (foundProduct) {
			foundProduct.update(updateData);
			return res.status(200).json({ msg: 'product update' });

		} else {
			res.status(400).json({ msg: 'product not found' });
		}
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: 'error' });
	}
};

async function deleteProduct (req, res) {

	try {
		const {id} = req.params;
		const datFound = await Product.findByPk(id);
		if (datFound) {
			datFound.destroy();
			return res.status(200).json({ msg: 'Product Destroyed' });
		}
		res.status(400).json(id);
	} catch (error) {
		console.log(error);
		res.status(400).json({ msg: 'error' });
	}
};


module.exports =  {
  getProducts,
   postProduct,
   getProductById,
   deleteProduct,
   updateProduct

 }
