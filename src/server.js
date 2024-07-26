const express=require('express')
const app=express()
// const dotenv=require('dotenv');
const mongoose= require('mongoose');
const MedicinesRoute = require("./routes/medicines")

const port=process.env.PORT||8000;

require('dotenv').config();
mongoose.connect("mongodb+srv://ananyapahwa82:medicines-api@medicines-api.jtsaoi2.mongodb.net/medicines-api")
    // useNewUrlParser: true,
    // // useCreateIndex: true,
    // useUnifiedTopology: true

.then(()=>console.log("database connected"))
.catch((err)=>console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("api/medicines", MedicinesRoute);
app.listen(process.env.PORT, ()=> console.log(`backend is running on ${port}`))

