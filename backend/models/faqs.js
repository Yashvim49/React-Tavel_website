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
   
    
});
module.exports=mongoose.model('faqs',faqsSchema);