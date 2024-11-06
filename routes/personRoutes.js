import express from 'express';
import person from '../models/person.js';

const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const newPerson = new person(data); //create new person documeny
        const response = await newPerson.save(); ///save new person document
        console.log('response', response);
        res.status(200).json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/', async (req, res) => {
    try {
        const data = await person.find();
        res.status(200).json(data);
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
        const response = await person.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
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
        const response = await person.findByIdAndDelete(id); //delete record by id
        console.log('response', response);
        res.status(200).json({ message: 'Record deleted successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }

});

//parameterized api url
router.get('/:workType', async (req, res) => {
    try {

        const workType = req.params.workType;
        console.log('workType', workType);
        if (workType == 'Chef'
            || workType == 'Waiter'
            || workType == 'Manager'
        ) {
            const data = await person.find({ work: workType });
            res.status(200).json(data);
        }
        else {
            res.status(400).json({ error: 'Invalid work type' });
            return;
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

export default router; //export router to use in server.js