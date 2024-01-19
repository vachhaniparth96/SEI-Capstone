const express = require('express')
const router = express.Router();

const paymentCtrl = require('../controllers/payments')

//POST- create new checkout session
router.post('/payment/checkout_session', paymentCtrl.stripeCheckoutSession)

//POST- create new payment for cart
router.post('/payment/webhook/', paymentCtrl.stripeWebhook)

module.exports = router;