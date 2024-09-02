const mongoose = require('mongoose');


const educationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    levelofeducation: {
        type: String,
        required: true
    },
    institutionname: {
        type: String,
        required: true

    },
    fieldofstudy: {
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
        default: 0  //0 pending
    },

});
module.exports = mongoose.model('education', educationSchema);
