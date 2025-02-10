const express = require('express');
const router = express.Router();

const users_controller = require('../controllers/users.controllers');
const roles_controller = require('../controllers/roles.controllers');
const posts_controller = require('../controllers/posts.controllers');
const publishers_controller = require('../controllers/publishers.controllers');


// USERS ROUTES
router.get('/users/getAllUsers/', users_controller.getAllUsers);
router.get('/users/getAllInactiveUsers/', users_controller.getAllInactiveUsers);
router.get('/users/getUserById/:params?', users_controller.getUserById);
router.get('/users/getAdmin/', users_controller.getAllAdmins);
router.post('/users/addNewUser/:params?', users_controller.addNewUser);
router.post("/users/login", users_controller.loginUser);
router.get("/users/hash", users_controller.hashPasswords); // hash old passwords
router.get('/users/getUserStatistics/', users_controller.getUserStatistics);



// ROLES ROUTES
router.get('/roles/getAllRoles/', roles_controller.getAllRoles);

// POSTS ROUTES
router.get('/posts/getAllPosts/', posts_controller.getAllPosts);

// PUBLISHERS ROUTES
router.get('/posts/getAllPublishers/', publishers_controller.getAllPublishers);

module.exports = router;
