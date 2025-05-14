    const express = require('express');
    const router = express.Router();
    const services = require('../models/services');
    const { body, validationResult } = require('express-validator');


    // ROUTE -1 : Get all the services using GET "/api/fatchallservices"
    router.get('/fetchallservices', async (req, res) => {
        try {
            const service = await services.find();
            res.json(service);
        } catch (error) {
            console.error(error.message);
            return res.status(500).send("Internal Server Error");
        }
    });

    //ROUTE - 2 :Add a new services using post "/api/services/addservices" .login require
    router.post('/addservices', [
        body('title', 'Enter a valid title').isLength({ min: 3 }),
        body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),], async (req, res) => {
            try {
                const { title, description, img } = req.body;

                // If there are errors, return Bad request and the errors
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }
                const service = new services({ title, description, img })
                const savedService = await service.save();
                res.json(savedService);
                

            } catch (error) {
                console.error(error.message);
                res.status(500).send("Internal Server Error");
            }
        })


//ROUTE - 3 :update eexisting services using put "/api/services/updateservices"
router.put('/updateservices/:id', async (req, res) => {
    const { title, description, img } = req.body;
    try {
        //create new service obj
        const newservices = {};
        if (title) { newservices.title = title };
        if (description) { newservices.description = description };
        if (img) { newservices.img = img };

        //find the service to be updated
        let service = await services.findById(req.params.id);
        if (!service) { res.status(404).send("Not Found") }
       
        service = await services.findByIdAndUpdate(req.params.id, { $set: newservices }, { new: true })
        res.json({ service });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


//ROUTE - 4 :delete service using delete "/api/services/deleteservices" 
router.delete('/deleteservices/:id', async (req, res) => {
    try {
        //find the note to be updated and update it
        let service = await services.findById(req.params.id);
        if (!service) { res.status(404).send("Not Found") }

        
        service = await services.findByIdAndDelete(req.params.id)
        res.json({ "Success": "service Has Been Deleted", service: service });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})

    module.exports = router;
