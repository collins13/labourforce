const mongoose = require('mongoose');

const { Schema } = mongoose;

const registerSchema = new Schema({
    _id: mongoose.Schema.Types.ObjectId,
    first: {
        type: String,
        required: true
    },
    last: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }

});
module.exports = mongoose.model('Register', registerSchema);