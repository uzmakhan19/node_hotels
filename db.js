///create db connection /bridge
// responsible to maintain node.js and mongodb

import mongoose, { mongo } from "mongoose";

//define mongodb connection url
const mongoURL='mongodb://127.0.0.1:27017/hotels'
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