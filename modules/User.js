const mongoose = require ('mongoose');
const userSchema = mongoose.Schema({
    email:{ type:string , require:true },
    password: { type:String , type:true},
    username:{type:String},
    serveraddress:{type:String}
});

module.exports = mongoose.model('User',userSchema);
