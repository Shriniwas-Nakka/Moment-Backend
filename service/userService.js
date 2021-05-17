let userModel = require('../model/userModel');
let passwordBcrypt = require('../middleware/passwordBcrypt');
let jwtToken = require('../middleware/jwtToken');
let { OK, Conflit, NotFound, BadRequest, Unauthorized, InternalServerError } = require('../middleware/httpStatusCode.json');

class UserService {

    userSignUpService = (obj, callback) => {
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

    userDataObject = (result) => {
        return {
            "_id": result._id,
            "firstName": result.firstName,
            "lastName": result.lastName,
            "email": result.email,
            "city": result.city,
            "mobile": result.mobile
        }
    }

    userSignInService = (obj, callback) => {
        let findUser = { email: obj.email }
        userModel.findUser(findUser, (error, data) => {
            if (error) {
                callback({ flag: false, message: "Something went wrong !", error: error, code: InternalServerError });
            } else if (data == null) {
                callback({ flag: false, message: "Email id does not exists !", code: NotFound });
            } else {
                passwordBcrypt.comparePassword(obj.password, data.password).then(result => {
                    if (result) {
                        let token = jwtToken.tokenGeneration(this.userDataObject(data));
                        let userData = this.userDataObject(data);
                        userData.token = token.token
                        callback(null, { flag: true, message: "Login Successful !", data: userData, code: OK });
                    } else {
                        callback({ flag: false, message: "Password does not match !", code: Unauthorized });
                    }
                }).catch(error => {
                    callback({ flag: false, message: "Something went wrong !", error: error, code: InternalServerError });
                })
            }
        })
    }

}

module.exports = new UserService();