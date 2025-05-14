const mongoose = require('mongoose');
const { Schema } = mongoose;

const visionsSchema = new Schema({
   
    title:{
        type: String,
        require: true
    },
    description:{
        type: String,
        require: true
    },
    img:{
        type: String,
        require:true
    },
    date:{
        type: Date,
        default: Date.now
    },
});
module.exports=mongoose.model('visions',visionsSchema);