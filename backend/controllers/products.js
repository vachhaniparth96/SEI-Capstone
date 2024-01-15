const Product = require('../models/Product');

module.exports = {
    createProduct,
    getProducts,
    productDetails,
}

//Create products
async function createProduct(req,res) {
    const product = await Product.create(req.body);
    try {
        res.status(201).json({product});
    } catch(err) {
        res.status(409).json({
            message: err.message,
        });
    }
}

//Get all products
async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

//Get single product
async function productDetails(req, res) {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}