const express = require('express');
const router = express.Router();

const productsCtrl = require('../controllers/products');

router.get('/', productsCtrl.getProducts);
router.post('/admin/products', productsCtrl.createProduct);

module.exports = router;