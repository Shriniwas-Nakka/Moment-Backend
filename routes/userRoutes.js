const route = require('express').Router();
const userController = require('../controller/userController');

route.post('/signup', userController.userSignUpController);
route.post('/signin', userController.userSignInController);

module.exports = route;