const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dockerode = require('dockerode'); // "dockerode" is a docker remote api nodejs module 
const authRoute = require('./Routes/auth');
const containerRoutes = require('./Routes/container');
const imageRoutes = require('./Routes/img');

                                        
//database connection

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
app.use(bodyParser.json());
app.use("/auth",authRoute);
app.use('/container', containerRoutes);
app.use('/Docker_images', imageRoutes);


module.exports= app;


//server connection
app.listen(3000,()=>{
    connect();
console.log("connected to backend!");
});