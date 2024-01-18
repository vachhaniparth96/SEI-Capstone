const express = require('express');
const { checkAuthentication, authorizeRoles } = require('../utility/checkAuth');

const router = express.Router();

const ordersCtrl = require('../controllers/orders')

router.post('/orders/new', checkAuthentication, ordersCtrl.newOrder)

router.get('/orders/:id', checkAuthentication, ordersCtrl.orderDetails)

router.get('/users/profile/orders', checkAuthentication, ordersCtrl.userOrders)

router.get('/admin/orders', checkAuthentication, authorizeRoles('admin'), ordersCtrl.allOrders)

router.put('/admin/orders/:id', checkAuthentication, authorizeRoles('admin'), ordersCtrl.updateOrders)

router.delete('/admin/orders/:id', checkAuthentication, authorizeRoles('admin'), ordersCtrl.deleteOrder)

module.exports = router;