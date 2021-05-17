let userModel = require('../model/userModel');
let passwordBcrypt = require('../middleware/passwordBcrypt');
let jwtToken = require('../middleware/jwtToken');
let { OK, Conflit, NotFound, BadRequest, Unauthorized, InternalServerError } = require('../middleware/httpStatusCode.json');

class UserService {

    userSignUpService = (obj, callback) => {
        console.log(obj);
        let findUser = { email: obj.email }
        userModel.findUser(findUser, (error, data) => {
            if (error) {
                callback({ flag: false, message: "Something went wrong !", error: error, code: InternalServerError });
            } else if (data == null) {
                obj.password = passwordBcrypt.encryptPassword(obj.password);
                userModel.createAccount(obj, (error, data) => {
                    if (error) {
                        callback({ flag: false, message: "Something went wrong !", error: error, code: InternalServerError });
                    } else {
                        callback(null, { flag: true, message: "Registration successful !", data: data, code: OK });
                    }
                })
            } else {
                callback({ flag: false, message: "Email id already exists !", code: Conflit });
            }
        })
    }

}

module.exports = new UserService();