let userService = require('../Service/userService');
let response = {};

class UserController {

    userControllerResponse = (res, value) => {
        response.success = value.flag;
        response.message = value.message;
        response.error = value.error
        response.data = value.data
        return res.status(value.code).send(response);
    }

    userSignUpController = (req, res, next) => {
        try {
            let data = {
                "firstName": req.body.firstName,
                "lastName": req.body.lastName,
                "email": req.body.email,
                "city": req.body.city,
                "mobile": req.body.mobile,
                "password": req.body.password
            }
            userService.userSignUpService(data, (error, data) => {
                if (error) {
                    this.userControllerResponse(res, error);
                } else {
                    this.userControllerResponse(res, data);
                }
            })
        } catch (error) {
            next(error)
        }
    }

    userSignInController = (req, res, next) => {
        try {
            let data = {
                "email": req.body.email,
                "password": req.body.password
            }
            userService.userSignInService(data, (error, data) => {
                if (error) {
                    this.userControllerResponse(res, error);
                } else {
                    this.userControllerResponse(res, data);
                }
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new UserController();