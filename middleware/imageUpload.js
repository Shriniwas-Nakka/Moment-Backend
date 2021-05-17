var multer = require('multer');

var storage = multer.diskStorage({
    // destination for file
    destination: (req, file, cb) => {
        cb(null, './public/uploads/images')
    },

    // extension for file
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

var upload = multer({ storage: storage });

module.exports = upload;