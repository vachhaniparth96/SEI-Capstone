const express = require('express');
const router = express.Router();

const productsCtrl = require('../controllers/products');

//GET- all products
router.get('/', productsCtrl.getProducts);

//GET- a single product
router.get('/:id', productsCtrl.productDetails);

//PUT- update a product
router.put('/:id', productsCtrl.updateProduct);

//DELETE- delete a product
router.delete('/:id', productsCtrl.deleteProduct);

//POST- create a product
router.post('/admin/products', productsCtrl.createProduct);

module.exports = router;