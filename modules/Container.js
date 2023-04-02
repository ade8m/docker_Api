const mongoose = require('mongoose');
const Containerschema = mongoose.Schema({
    ContainerName:{type:string},
    ImgName:{type:string},
    Port:{type:Number},
    Volume:{type:Number},
    Networking:{type:String}

});
module.exports = mongoose.model('Container',Containerschema);
