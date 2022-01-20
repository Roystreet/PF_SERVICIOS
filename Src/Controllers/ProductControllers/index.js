
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

async function postProduct (req,res){
    try {
        
        let {product, ownerId} = req.body;
        let addedProduct = await Product.create({
            ...product
        })
        let user = await User.findByPk(ownerId)
        await user.addProduct(addedProduct)
        res.status(201).json(addedProduct)

    } catch (err) {
        res.status(400).send('error. Verify request data');
        console.log(err)
    }
}



module.exports =  {getProducts, postProduct}