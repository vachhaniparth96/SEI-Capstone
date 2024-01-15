const Product = require('../models/Product');

module.exports = {
    createProduct,
    getProducts,
    productDetails,
    updateProduct,
    deleteProduct,
}

//Create products. This functionality should only be accessible by an admin
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

//Update single product. This functionality should only be accessible by an admin
async function updateProduct(req, res) {
    try{
        let product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({ message: "Product not found" });
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({ message: err.message });
    }
}

//Delete a product. This functionality should only be accessible by an admin
async function deleteProduct(req, res) {
        try{
            let product = await Product.findById(req.params.id);
            if(!product) {
                return res.status(404).json({ message: "Product not found" });
            }
            product = await Product.deleteOne({ _id: req.params.id });
            res.status(200).json({ message: "Product deleted successfully" });
        }catch(err){
            res.status(500).json({ message: err.message });
        }
    }