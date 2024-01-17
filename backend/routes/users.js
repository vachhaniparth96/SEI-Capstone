const express = require('express');
const { checkAuthentication } = require('../utility/checkAuth');
const router = express.Router();

const userCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/profile', checkAuthentication, userCtrl.getUsers)

module.exports = router;
