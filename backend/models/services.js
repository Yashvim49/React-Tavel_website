const mongoose = require('mongoose');
const { Schema } = mongoose;

const servicesSchema = new Schema({
   
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
module.exports=mongoose.model('services',servicesSchema);