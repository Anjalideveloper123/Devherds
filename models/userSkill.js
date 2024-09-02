const mongoose = require('mongoose');


const userSkillSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,


    },
    skillId: [{
        type: String,
        required: true
    }]
    ,

    status: {
        type: Number,
        default: 0 // 0 = active 
    }
});
module.exports = mongoose.model('userskill', userSkillSchema);