const express = require('express');
const router = express.Router();
const faqs = require('../models/faqs');
const { body, validationResult } = require('express-validator');


// ROUTE -1 : Get all the faqs using GET "/api/fatchallfaqs"
router.get('/fetchallfaqs', async (req, res) => {
    try {
        const faq = await faqs.find();
        res.json(faq);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

//ROUTE - 2 :Add a new faqs using post "/api/faqs/addfaqs" 
router.post('/addfaqs', [
    body('question', 'Enter a valid question').isLength({ min: 3 }),
    body('answer', 'answer must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { question, answer } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const faq = new faqs({ question, answer })
            const savedFaq = await faq.save();
            res.json(savedFaq);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    
//ROUTE - 3 :update eexisting faqs using put "/api/faqs/updatefaqs"
router.put('/updatefaqs/:id', async (req, res) => {
    const { question, answer } = req.body;
    try {
        //create new visions obj
        const newfaqs = {};
        if (question) { newfaqs.question = question };
        if (answer) { newfaqs.answer = answer };

        //find the visions to be updated
        let faq = await faqs.findById(req.params.id);
        if (!faq) { res.status(404).send("Not Found") }
       
        faq = await faqs.findByIdAndUpdate(req.params.id, { $set: newfaqs }, { new: true })
        res.json({ faq });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE - 4 :delete faqs using delete "/api/faqs/deletefaqs" 
router.delete('/deletefaqs/:id', async (req, res) => {
    try {
        //find the faqs to be updated and update it
        let faq = await faqs.findById(req.params.id);
        if (!faq) { res.status(404).send("Not Found") }

        
        faq = await faqs.findByIdAndDelete(req.params.id)
        res.json({ "Success": "vision Has Been Deleted", faq: faq });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

    module.exports = router;
