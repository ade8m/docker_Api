const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dockerode = require('dockerode'); // "dockerode" is a docker remote api nodejs module 
                                        





//databse connection

dotenv.config();

const connect = async () =>{ 

try{
    
    await mongoose.connect(process.env.mongo);
    console.log("connected to mongoDB.")
}   catch (error){
    throw error;
}
};

//middellware


app.use(express.json());





//server connection


app.listen(3000,()=>{
    connect();
console.log("connected to backend!");
});