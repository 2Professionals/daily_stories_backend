const express = require('express');
const router = express.Router(); // Express Router

const users_controller = require('../controllers/users.controllers');

router.get('/users/getAllUsers/', users_controller.getAllUsers);
router.get('/users/getUserById/:params?', users_controller.getUserById);
router.get('/users/getAdmin/', users_controller.getAdmin);


module.exports = router;
