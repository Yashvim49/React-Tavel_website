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
    
});
module.exports=mongoose.model('visions',visionsSchema);