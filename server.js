import express from 'express';
import db from './db.js';
import personRoutes from './routes/personRoutes.js';
import menuRoutes from './routes/menuRoutes.js';

const app = express();

import bodyParser from 'body-parser';
app.use(bodyParser.json());

app.use('/person', personRoutes);
app.use('/menuItem', menuRoutes);


app.get('/', function (req, res) {
    res.send('welcome to my hotel...')
})

//app.listen(3000) //server active

app.listen(3000, () => { console.log('server is listing on port 3000.') })