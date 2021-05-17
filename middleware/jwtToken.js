const jwt = require('jsonwebtoken');
let { Forbidden, Unauthorized, InternalServerError } = require('./httpStatusCode.json');
let response = {};

const tokenGeneration = (payload) => {
    let token = jwt.sign(payload, process.env.SECRETKEY);
    response.success = true
    response.message = 'Token generated successfully!'
    response.token = token
    return response;
};

const tokenVerification = (req, res, next) => {
    try {
        let token = req.header('token') || req.params.token;

        if (token) {
            jwt.verify(token, process.env.SECRETKEY, (err, data) => {
                if (err) {
                    response.error = true;
                    response.message = "Unauthorized User!";
                    return res.status(Unauthorized).send(response);
                } else {
                    req.decoded = data;
                    next();
                }
            })
        } else {
            response.error = true;
            response.message = "Unauthorized User!";
            return res.status(Forbidden).send(response);
        }
    } catch (error) {
        next(error)
    }
}

module.exports = { tokenGeneration, tokenVerification };