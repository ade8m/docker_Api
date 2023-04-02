const mongoose = require('mongoose');
const Imageschema = mongoose.Schema({
ImgName:{type:string},
version:{type:Number},
description:{type:String},
Dockerfile:{type:String},
SourceCode:{type:string},
Size:{type:Number}
});
module.exports = mongoose.model('Image',Imageschema);