const Product = require('../models/Product');
const Filter = require('../utility/filters');

module.exports = {
    createProduct,
    getProducts,
    productDetails,
    updateProduct,
    deleteProduct,
    createReview,
    allReviews,
    deleteReview
}

//Admin Only- Create products
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
        const resultLimit = 12; //limiting the amount of results per page, will adjust after adding products to data.js
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

//Admin Only- Update single product.
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

//Admin Only- Delete a product
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

//Create a review for a product
async function createReview(req,res) {

    //pulling the data needed for the review from the request body
    const { rating, comment, productId } = req.body

    // creating a review object that contains the relevant information to be pushed into the review based off the reviewSchema model
    const review = {
        user: req.user._id,
        rating: Number(rating),
        comment,
    }

    //finding the specific product the review will be left on
    const product = await Product.findById(productId);

    if(!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    
    }

    //Checking each review to see if the user that posted the review is the user that is currently logged in
    const reviewPresent = product.reviews.find((r) => r.user.toString() === req.user._id.toString())

    //If so, the previous review gets updated with the new comment and rating. If no previous review is present, the review gets pushed into the array
    if (reviewPresent) {
        product.reviews.forEach((review) => {
            if(review.user.toString() === req.user._id.toString()) {
                review.comment = comment;
                review.rating = rating;
            }
        })
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    //adjusts average rating as reviews are made and added
    product.ratings = product.reviews.reduce((acc, item) => item.rating + acc, 0)/product.reviews.length;

    await product.save({validateBeforeSave: false})

    res.status(200).json({
        message: "Review has been successfully added"
    })
}

//See all the reviews that are left on a product
async function allReviews(req,res,next) {
    const product = await Product.findById(req.params.id);

    if(!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json({
        reviews: product.reviews,
    })
}

//Admin only- Delete reviews
async function deleteReview(req,res,next) {
    let product = await Product.findById(req.query.productId)

    if(!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    //filters out the review with the matching id, leaving all other reviews in the reviews array
    const reviews = product.reviews.filter((review) => review._id.toString() !== req.query.id.toString())

    //adjusting numOfReviews based off removed review
    const numOfReviews = reviews.length;

    //adjusting ratings based off removed review
    const ratings = numOfReviews === 0 ? 0 : product.reviews.reduce((acc, item) => item.rating + acc, 0) / numOfReviews;

    //Update the product to reflect all the changes
    product = await Product.findByIdAndUpdate(req.query.productId, { reviews, numOfReviews, ratings}, { new: true});

    res.status(200).json({
        message: "Review deleted successfully and product has been adjusted to reflect the changes.",
        product,
    })
}