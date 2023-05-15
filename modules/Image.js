const mongoose = require('mongoose');
const Imageschema = mongoose.Schema({
ImgName:{type:String},
version:{type:Number},
description:{type:String},
Dockerfile:{type:String},
SourceCode:{type:String},
Size:{type:Number}
});
module.exports = mongoose.model('Image',Imageschema);