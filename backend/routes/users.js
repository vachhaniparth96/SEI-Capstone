const express = require('express');
const { checkAuthentication, authorizeRoles } = require('../utility/checkAuth');
const router = express.Router();

const userCtrl = require('../controllers/users')

/* GET users listing. */
router.get('/profile', checkAuthentication, userCtrl.getUsers)

router.put('/profile/update', checkAuthentication, userCtrl.updateProfile)

router.get('/admin/users', checkAuthentication, authorizeRoles('admin'), userCtrl.getAllUsers)

router.get('/admin/users/:id', checkAuthentication, authorizeRoles('admin'), userCtrl.userDetails)

router.put('/admin/users/:id', checkAuthentication, authorizeRoles('admin'), userCtrl.updateUsers)

router.delete('/admin/users/:id', checkAuthentication, authorizeRoles('admin'), userCtrl.deleteUsers)

module.exports = router;
