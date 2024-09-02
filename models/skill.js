const mongoose = require('mongoose');


const skillSchema = new mongoose.Schema({
    // userId: {
    //     type: mongoose.Schema.Types.ObjectId,


    // },
    name: {
        type: String,

    },
    status: {
        type: Number,
        default: 0 // 0 = active 
    }
});
module.exports = mongoose.model('skill', skillSchema);
