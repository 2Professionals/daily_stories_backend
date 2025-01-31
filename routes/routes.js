const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users.controllers');
const roles_controller = require('../controllers/roles.controllers');

// USERS ROUTES
router.get('/users/getAllUsers/', users_controller.getAllUsers);
router.get('/users/getUserById/:params?', users_controller.getUserById);
router.get('/users/getAdmin/', users_controller.getAllAdmins);
router.post('/users/addNewUser/:params?', users_controller.addNewUser);
router.post("/users/login", users_controller.loginUser);
router.get("/users/hash", users_controller.hashPasswords); // hash old passwords
router.get('/users/get_all_users_count/', users_controller.get_all_users_count);
router.get('/users/get_all_active_users_count/', users_controller.get_all_active_users_count);
router.get('/users/get_all_inactive_users_count/', users_controller.get_all_inactive_users_count);



// ROLES ROUTES
router.get('/roles/getAllRoles/', roles_controller.getAllRoles);

module.exports = router;
