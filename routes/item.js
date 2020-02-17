const express = require('express');
const router = express.Router();
const Item = require('../models/itemSchema');

router.get('/all', async (req,res) => {
    let allItems;
    try {
        allItems = await Item.find({});
        return res.send(allItems);
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Database Issue");
    }
});

router.get('/:id', async (req,res) => {
    try {
         let item = await Item.findOne({ barcodeId: req.params.id });
         if (item) {
           return res.json(item);
         }
         else {
             return res.status(404).send("Item doesn't exist");
         }
        
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Database issue");
    }
   
});

router.post('/new',async (req,res)=>{
    const {barcodeId,name,price,weight} = req.body;
    try {
        let item = new Item({
            barcodeId,
            name,
            price,
            weight
        });

        await item.save();
        return res.json({item});
   
    } catch (error) {
        console.error(error.message);
        return res.status(500).send("Database Issue");
    }
});



module.exports = router;