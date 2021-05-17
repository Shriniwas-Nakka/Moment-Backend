let momentModel = require('../model/momentModel');
let { OK, Conflit, NotFound, BadRequest, Unauthorized, InternalServerError } = require('../middleware/httpStatusCode.json');

class MomentService {

    momentCreateService = (obj, callback) => {
        momentModel.createMoment(obj, (error, data) => {
            if (error) {
                callback({ flag: false, message: "Something went wrong !", error: error, code: InternalServerError });
            } else {
                callback(null, { flag: true, message: "Moment Created !", data: data, code: OK });
            }
        })
    }

    momentReadService = (callback) => {
        let obj = {};
        momentModel.readMoment(obj, (error, data) => {
            if (error) {
                callback({ flag: false, message: "Something went wrong !", error: error, code: InternalServerError });
            } else if (data.length == 0) {
                callback({ flag: false, message: "No moments found !", code: NotFound });
            } else {
                callback(null, { flag: true, message: "Moments Found !", data: data, code: OK });
            }
        })
    }

}

module.exports = new MomentService();