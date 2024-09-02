const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({

    fullname:
    {
        type: String,
        required: true

    },
    dateofbirth: {
        type: String,
        required: true
    },
    skill: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "skill"

    }],
    gender: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    resume: {
        type: String,

    }
    ,
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
        type: String,
        required: true
    },
    location: {
        type: String,
        lowercase: true,
        required: true
    },
    image: {
        type: String
    },

    status: {
        type: Number,
        default: 0 // 0 = active ,2 = delete
    },

});
module.exports = mongoose.model('user', userSchema);
