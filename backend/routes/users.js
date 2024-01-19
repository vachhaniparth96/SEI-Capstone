const express = require('express');
const { checkAuthentication, authorizeRoles } = require('../utility/checkAuth');
const router = express.Router();

const userCtrl = require('../controllers/users')

//GET- user profile. Requires Auth
router.get('/profile', checkAuthentication, userCtrl.getUsers)

//PUT- update user profile. Requires Auth
router.put('/profile/update', checkAuthentication, userCtrl.updateProfile)

//GET- get all user profiles (Admin Only)
router.get('/admin/users', checkAuthentication, authorizeRoles('admin'), userCtrl.getAllUsers)

//GET- get a specific profile (Admin Only)
router.get('/admin/users/:id', checkAuthentication, authorizeRoles('admin'), userCtrl.userDetails)

//PUT- update a specific profile (Admin Only)
router.put('/admin/users/:id', checkAuthentication, authorizeRoles('admin'), userCtrl.updateUsers)

//DELETE- delete a profile (Admin Only)
router.delete('/admin/users/:id', checkAuthentication, authorizeRoles('admin'), userCtrl.deleteUsers)

module.exports = router;
