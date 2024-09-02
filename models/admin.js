const mongoose = require('mongoose');


const adminSchema = new mongoose.Schema({
    fullname:
    {
        type: String,
        required: true

    },
    dateofbirth: {
        type: String,
        required: true
    },
    gender: {
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
    },
    dialcode: {
        type: String,
    },
    countrycode: {
        type: String,
        required: true
    },
    phonenumber: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        lowercase: true,
        required: true
    },
    status: {
        type: Number,
        default: 0  //0 pending
    },

});
module.exports = mongoose.model('admin', adminSchema);
