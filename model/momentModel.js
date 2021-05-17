const mongoose = require('mongoose');

let momentSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'title is required !']
    },
    tags: {
        type: Array,
        required: [true, 'tags is required !']
    },
    image: {
        type: String,
        // required: [true, 'image is required !'],
        // unique: true
    }
}, {
    timestamps: true
});

let moments = mongoose.model('moments', momentSchema);

class MomentModel {

    createMoment = (obj, callback) => {
        moments.create(obj, (error, data) => {
            if (error) {
                callback(error);
            } else {
                callback(null, data);
            }
        })
    }

    readMoment = (obj, callback) => {
        moments.find(obj, (error, data) => {
            if (error) {
                callback(error);
            } else {
                callback(null, data);
            }
        })
    }

}

module.exports = new MomentModel();