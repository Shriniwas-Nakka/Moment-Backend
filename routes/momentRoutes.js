const route = require('express').Router();
const momentController = require('../controller/momentController');
const imageUpload = require('../middleware/imageUpload');

route.post('/', imageUpload.single('image'), momentController.momentCreateController);

module.exports = route;