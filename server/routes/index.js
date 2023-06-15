const express = require('express');
const userController = require('../controllers/user');
const authentication = require('../middlewares/authentication');
const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);

router.get('/users', authentication, userController.getUsers);

module.exports = router;