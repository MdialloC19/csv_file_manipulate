const express=require('express');
const app=express();
const router=require('./routes/router');

app.get('/',router);
app.use('/api/spread',router);

module.exports=app;

