const express = require('express');
const router = express.Router();
const UserController = require('../controller/user');
const { register,login } = require('../validator/user');


/**
 * Register
 */
router.post('/register',register,UserController.register)


/**
 * Login
 */
 router.post('/login',login,UserController.login)


module.exports = router;