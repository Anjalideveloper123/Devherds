const mongoose = require('mongoose');


const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,

    },
    posttitle: {
        type: String,

    },
    description: {
        type: String,

    },
    image: {
        type: String

    },
    status: {
        type: Number,
        default: 0  //0 pending
    },

});
module.exports = mongoose.model('post', postSchema);
