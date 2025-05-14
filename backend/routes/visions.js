const express = require('express');
const router = express.Router();
const visions = require('../models/vision');
const { body, validationResult } = require('express-validator');


// ROUTE -1 : Get all the visions using GET "/api/fatchallvisions"
router.get('/fetchallvisions', async (req, res) => {
    try {
        const vision = await visions.find();
        res.json(vision);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Internal Server Error");
    }
});

//ROUTE - 2 :Add a new visions using post "/api/services/addvisions" .login require
router.post('/addvisions', [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, img } = req.body;

            // If there are errors, return Bad request and the errors
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const vision = new visions({ title, description, img })
            const savedVision = await vision.save();
            res.json(savedVision);

        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal Server Error");
        }
    })
    
//ROUTE - 3 :update eexisting visions using put "/api/visions/updatevisions"
router.put('/updatevisions/:id', async (req, res) => {
    const { title, description, img } = req.body;
    try {
        //create new visions obj
        const newvisions = {};
        if (title) { newvisions.title = title };
        if (description) { newvisions.description = description };
        if (img) { newvisions.img = img };

        //find the visions to be updated
        let vision = await visions.findById(req.params.id);
        if (!vision) { res.status(404).send("Not Found") }
       
        vision = await visions.findByIdAndUpdate(req.params.id, { $set: newvisions }, { new: true })
        res.json({ vision });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

//ROUTE - 4 :delete visions using delete "/api/visions/deletevisions" 
router.delete('/deletevisions/:id', async (req, res) => {
    try {
        //find the visions to be updated and update it
        let vision = await visions.findById(req.params.id);
        if (!vision) { res.status(404).send("Not Found") }

        
        vision = await visions.findByIdAndDelete(req.params.id)
        res.json({ "Success": "vision Has Been Deleted", vision: vision });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

    module.exports = router;
