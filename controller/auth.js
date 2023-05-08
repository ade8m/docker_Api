const User =require("../modules/User") ;
const bcrypt =require("bcrypt");
const  Jwt  =require("jsonwebtoken");

 exports.registre = async(req,res) =>{
    try {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(req.body.password, salt);

    const newUser = new User({
        username:req.body.username,
        email:req.body.email,
        serveraddress:req.body.serveraddress,
        password:hash,
    })
    await newUser.save()
    res.status(200).send("user added successfully!")
    } catch (error) {
        throw error;
    }
}
  exports.login = async (req,res) =>{
    try {
        const user = await User.findOne({username:req.body.username})
        if(!user)
        return res.status(401).json({
            error: new Error('User not found!')
          });
        const pwd = await bcrypt.compare(req.body.password, user.password)
        if(!pwd)
        return res.status(401).json({
            error: new Error('incorrect password!')
          });
        const token = Jwt.sign({userid: user._id}, 'RANDOM_TOKEN_SECRET',
        { expiresIn: '24h' });
       
        res.status(200).json({
            userid: user._id,
            token: token
        });
    } catch (error) {
        throw error
    }

 }