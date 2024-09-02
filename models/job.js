const mongoose = require('mongoose');


const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,

    },
    jobposition: {
        type: String,


    },
    typeofworkplace: {
        type: String,

    },
    joblocation: {
        type: String,

    },
    company: {
        type: String,

    },
    employmenttype: {
        type: String,

    },
    status: {
        type: Number,
        default: 0  //0 pending
    },

});
module.exports = mongoose.model('job', jobSchema);
