const mongoose = require('mongoose');


const experienceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    jobtitle: {
        type: String,
        required: true
    },
    company: {
        type: String,
        required: true
    },
    startdate: {
        type: String,
        required: true
    },
    enddate: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    status: {
        type: Number,
        default: 0 // 0 = active ,1 = delete
    },

});
module.exports = mongoose.model('experience', experienceSchema);
