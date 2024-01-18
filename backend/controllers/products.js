const Product = require('../models/Product');
const Filter = require('../utility/filters');

module.exports = {
    createProduct,
    getProducts,
    productDetails,
    updateProduct,
    deleteProduct,
}

//Create products. This functionality should only be accessible by an admin
async function createProduct(req,res) {

    req.body.user = req.user._id

    const product = await Product.create(req.body);
    try {
        res.status(201).json(product);
    } catch(err) {
        res.status(409).json({
            message: err.message,
        });
    }
}

//Get all products
async function getProducts(req, res) {
    try {
        // Filter products based on query parameters using a filter utility class
        const resultLimit = 100; //limiting the amount of results per page, will adjust after adding products to data.js
        const productFilter = new Filter(Product, req.query).search().addFilters();
        let products = await productFilter.query;
        let productsCount = products.length;

        // Adding pagination
        productFilter.addPagination(resultLimit);
        products = await productFilter.query.clone();
        if(products.length === 0) {
            return res.status(404).json({
                message: "No products found for this query"
            });
        }
        res.status(200).json({
            resultLimit,
            productsCount, 
            products
        });
    } catch (err) {
        res.status(500).json({ 
            message: err.message 
        });
    }
}

//Get single product
async function productDetails(req, res) {
    try{
        const product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

//Update single product. This functionality should only be accessible by an admin
async function updateProduct(req, res) {
    try{
        let product = await Product.findById(req.params.id);
        if(!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true
        });
        res.status(200).json(product);
    }catch(err){
        res.status(500).json({
            message: err.message
        });
    }
}

//Delete a product. This functionality should only be accessible by an admin
async function deleteProduct(req, res) {
        try{
            let product = await Product.findById(req.params.id);
            if(!product) {
                return res.status(404).json({
                    message: "Product not found"
                });
            }
            product = await Product.deleteOne({
                _id: req.params.id
            });
            res.status(200).json({
                message: "Product deleted successfully"
            });
        }catch(err){
            res.status(500).json({
                message: err.message
            });
        }
    }