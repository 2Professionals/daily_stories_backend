const express = require('express');
const router = express.Router(); // Express Router

const mus_users_controller = require('../controllers/users.controllers');

router.get('/mus_users/getAllUsers/', mus_users_controller.getAllUsers);
router.get('/mus_users/getUserById/:params?', mus_users_controller.getUserById);
router.get('/mus_users/getAdmin/', mus_users_controller.getAdmin);


module.exports = router;
