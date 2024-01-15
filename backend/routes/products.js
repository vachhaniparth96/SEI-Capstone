const express = require('express');
const router = express.Router();

const productsCtrl = require('../controllers/products');

//GET- all products
router.get('/', productsCtrl.getProducts);

//GET- a single product
router.get('/:id', productsCtrl.productDetails);

//POST- create a product
router.post('/admin/products', productsCtrl.createProduct);

module.exports = router;