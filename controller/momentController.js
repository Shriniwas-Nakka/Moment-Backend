let momentService = require('../Service/momentService');
let response = {};

class UserController {

    momentControllerResponse = (res, value) => {
        response.success = value.flag;
        response.message = value.message;
        response.error = value.error
        response.data = value.data
        return res.status(value.code).send(response);
    }

    momentCreateController = (req, res, next) => {
        try {
            let data = {
                "title": req.body.title,
                "tags": req.body.tags,
                "image": req.file.originalname
            }
            momentService.momentCreateService(data, (error, data) => {
                if (error) {
                    this.momentControllerResponse(res, error);
                } else {
                    this.momentControllerResponse(res, data);
                }
            })
        } catch (error) {
            next(error)
        }
    }

    momentReadController = (req, res, next) => {
        try {
            momentService.momentReadService((error, data) => {
                if (error) {
                    this.momentControllerResponse(res, error);
                } else {
                    this.momentControllerResponse(res, data);
                }
            })
        } catch (error) {
            next(error)
        }
    }

}

module.exports = new UserController();