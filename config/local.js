module.exports = {
    "PORT": process.env.LOCAL_PORT,
    "MONGODBURL": {
        "url": process.env.MONGO_URL_LOCAL,
        "option": { "useNewUrlParser": true, "useUnifiedTopology": true, "useFindAndModify": false, "useCreateIndex": true }
    },
    "SECRET_KEY": process.env.SECRET_KEY_LOCAL
}
