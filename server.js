import express from 'express';
import db from './db.js';
import personRoutes from './routes/personRoutes.js';
import menuRoutes from './routes/menuRoutes.js';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use('/person', personRoutes);
app.use('/menuItem', menuRoutes);

const port = process.env.PORT || 3000;

//app.listen(3000) //server active

app.listen(3000, () => { console.log('server is listing on port 3000.') })