const Product = require('../models/Product');

module.exports = {
    createProduct,
    getProducts,
}

async function createProduct(req,res) {
    const product = await Product.create(req.body);
    try {
        res.status(201).json({
            product,
        });
    } catch(err) {
        res.status(409).json({
            message: err.message,
        });
    }
}

async function getProducts(req, res) {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}