const express = require('express')
const router = express.Router();

const authCtrl = require('../controllers/authorization')

//Post- register user
router.post("/register", authCtrl.registerUser)

module.exports = router;