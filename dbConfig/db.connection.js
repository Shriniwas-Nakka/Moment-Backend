const mongoose = require('mongoose');
var configVal = require("../config/local");

mongoose.connect(configVal.MONGODBURL.url, configVal.MONGODBURL.option).then(() => {
    console.log("Connectioon estabilished successfully!")
}).catch(() => {
    console.log("Failed to connect to database!")
});