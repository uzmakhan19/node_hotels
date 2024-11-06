import express from 'express';
import MenuItem from '../models/MenuItem.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newMenu = new MenuItem(data); //create new menu document
        const response = await newMenu.save(); ///save new menu document
        console.log('response', response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await MenuItem.find();
        res.status(200).json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//get menu by taste
router.get('/:taste', async (req, res) => {
    try {
        const taste = req.params.taste;
        console.log('taste', taste);
        if (taste == 'Spicy'
            || taste == 'Sweet'
            || taste == 'Sour'
            || taste == 'Bitter'
            || taste == 'Salty'
        ) {
            const data = await MenuItem.find({ taste: taste });
            res.status(200).json(data);
        }
        else {
            res.status(400).json({ error: 'Invalid taste' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//update record by id

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const response = await MenuItem.findByIdAndUpdate(id, data, {
            new: true, //return updated record
            runValidators: true //validate the update operation
        });  //update record by id

        if (!response) {
            res.status(400).json({ error: 'Record not found' });
            return;
        }

        console.log('response', response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

///delete record by id

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const response = await MenuItem.findByIdAndDelete(id); //delete record by id
        console.log('response', response);
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

});

export default router; //export router to use in server.js