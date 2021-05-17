const route = require('express').Router();
const momentController = require('../controller/momentController');
const imageUpload = require('../middleware/imageUpload');
const { tokenVerification } = require('../middleware/jwtToken');

route.post('/', tokenVerification, imageUpload.single('image'), momentController.momentCreateController);

module.exports = route;