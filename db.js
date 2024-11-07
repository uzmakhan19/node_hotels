///create db connection /bridge
// responsible to maintain node.js and mongodb

import mongoose, { mongo } from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
//define mongodb connection url
// const mongoURL=  process.env.MONGODB_URL_LOCAL;
const mongoURL=  process.env.MONGODB_URL;



mongoose.connect(mongoURL,{
    usenewUrlParser:true,
    useUnifiedTopology:true
})

const db=mongoose.connection;

db.on('connected',()=>{
    console.log('mongoDB server connected')
})

db.on('disconnected',()=>{
    console.log('mongoDB srver disconnected')
})

export default db;