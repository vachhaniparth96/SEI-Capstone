const express = require('express');
const { checkAuthentication, authorizeRoles } = require('../utility/checkAuth');

const router = express.Router();

const ordersCtrl = require('../controllers/orders')

//POST- placing new order
router.post('/orders/new', ordersCtrl.newOrder)

//GET- Order details page after placing order
router.get('/orders/:id', ordersCtrl.orderDetails)

//GET- All orders placed by the user. Requires Auth
router.get('/users/profile/orders', checkAuthentication, ordersCtrl.userOrders)

//GET- All orders placed by all users (Admin Only)
router.get('/admin/orders', checkAuthentication, authorizeRoles('admin'), ordersCtrl.allOrders)

//PUT- Update an order (Admin Only)
router.put('/admin/orders/:id', checkAuthentication, authorizeRoles('admin'), ordersCtrl.updateOrders)

//DELETE- Delete an order (Admin Only)
router.delete('/admin/orders/:id', checkAuthentication, authorizeRoles('admin'), ordersCtrl.deleteOrder)

module.exports = router;