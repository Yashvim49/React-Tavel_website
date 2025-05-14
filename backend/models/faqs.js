const mongoose = require('mongoose');
const { Schema } = mongoose;

const faqsSchema = new Schema({
   
    question:{
        type: String,
        require: true
    },
    answer:{
        type: String,
        require: true
    },
    date:{
        type: Date,
        default: Date.now
    },
   
    
});
module.exports=mongoose.model('faqs',faqsSchema);