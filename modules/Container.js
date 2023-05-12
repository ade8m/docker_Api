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
    },
    RamUsage:{
      type:String,
      required:true 
    },
    DiskUsage:{
      type:String,
      required:true 
    }
});
module.exports = mongoose.model('Container',Containerschema);








