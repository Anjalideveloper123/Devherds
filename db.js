let mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/db").then(res => {
    console.log('database connected')
}).catch(err => {
    console.log('err')
})
