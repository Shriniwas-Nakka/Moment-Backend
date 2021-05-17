const route = require('express').Router();
const userController = require('../controller/userController');

route.post('/signup', userController.userSignUpController);

module.exports = route;