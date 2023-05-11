const mongoose = require('mongoose');
const Containerschema = mongoose.Schema({
    ContainerName:{
      type:String,
      required:true},
    ImgName:{
      type:String,
      required:true},
    containerId:{
      type:String,
      required:true 
    }
});
module.exports = mongoose.model('Container',Containerschema);







// logic of stop container
/*
exports.stopContainer =(req,res) =>{
    const config={
nameC:req.body.ContainerName,
    }
    try{
   const container = docker.getContainer(config);
 
     container.stop(); 

   console.log('Container stopped successfully.');
 
    }catch(error) {
   console.error('Error stopping container:', error);
   throw error;
 }
};*/ 