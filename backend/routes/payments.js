const express = require('express')
const router = express.Router();

const paymentCtrl = require('../controllers/payments')

router.post('/payment/checkout_session', paymentCtrl.stripeCheckoutSession)

router.post('/payment/webhook', paymentCtrl.stripeWebhook)

module.exports = router;