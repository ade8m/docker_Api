const mongoose = require('mongoose');
const Containerschema = mongoose.Schema({
    ContainerName:{type:String},
    ImgName:{type:String},
    portNumber:{type:Number},
    cmd:{type:String},


});
module.exports = mongoose.model('Container',Containerschema);
