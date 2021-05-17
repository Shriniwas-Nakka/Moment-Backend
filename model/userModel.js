const mongoose = require('mongoose');

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'firstName is required !']
    },
    lastName: {
        type: String,
        required: [true, 'lastName is required !']
    },
    email: {
        type: String,
        required: [true, 'email is required !'],
        unique: true
    },
    city: {
        type: String,
        required: [true, 'city is required !']
    },
    mobile: {
        type: Number,
        minlength: 10,
        maxlength: 10,
        required: [true, 'mobile is required !']
    },
    password: {
        type: String,
        required: [true, 'password is required !']
    }
}, {
    timestamps: true
});

let users = mongoose.model('users', userSchema);

class UserModel {

    createAccount = (obj, callback) => {
        users.create(obj, (error, data) => {
            if (error) {
                callback(error);
            } else {
                callback(null, data);
            }
        })
    }

    findUser = (obj, callback) => {
        users.findOne(obj, (error, data) => {
            if (error) {
                callback(error);
            } else {
                callback(null, data);
            }
        })
    }

}

module.exports = new UserModel();