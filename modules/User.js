const mongoose = require ('mongoose');
const userSchema = mongoose.Schema({
    email:{ type:String , require:true },
    password: { type:String },
    username:{type:String},
    serveraddress:{type:String}
});

module.exports = mongoose.model('User',userSchema);
