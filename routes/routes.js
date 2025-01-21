const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users.controllers');
const roles_controller = require('../controllers/roles.controllers');

// USERS ROUTES
router.get('/users/getAllUsers/', users_controller.getAllUsers);
router.get('/users/getUserById/:params?', users_controller.getUserById);
router.get('/users/getAdmin/', users_controller.getAllAdmins);
router.post('/users/addNewUser/:params?', users_controller.addNewUser);

// ROLES ROUTES
router.get('/roles/getAllRoles/', roles_controller.getAllRoles);

module.exports = router;
