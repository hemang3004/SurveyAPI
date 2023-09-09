const User = require("../models/user")
var { expressjwt: expjwt } = require("express-jwt");
const jwt = require('jsonwebtoken');
const SECRET="playpower"

exports.signup = (req, res) => {
    const user = new User(req.body); // creating a temp user to store in db
 
    user.save((err, user) => {
        if (err) {
            // console.log(err);
            return res.status(400).json({
                //this error can occur if already signedup user, signs up again
                err: "NOT ABLE TO SAVE this"
            });
        }
        res.json(user);
    })

}
// check if user is signed in
exports.isSignedin=expjwt({
    secret: SECRET,
    userProperty:"auth",
    algorithms:['HS256']
});
// check if user is authenticated
exports.isAuthenticated= (req,res,next) =>{
    var check=req.profile && req.auth && req.auth._id == req.profile._id
    if(!check){
        return res.status(403).json({
            error:"Acccess Denied"
        });
    }
    next();
}
exports.signin = (req, res) => {

    // destructuring as authentication only required password & username 
    const { username, password } = req.body;
    // finding the very first user present in db and retriving it 
    User.findOne({username}, (err, user) => {
        // if theres any error or theres no such user
        if (err || !user) {
            
            return res.status(400).json({
                error: "Username dosen't exist"
            })
        }
        if (!user.authenticate(password)) {
            // console.log(username,"pass inc");
            return res.status(400).json({
                error: "Password is incorrect"
            })
        }
        
        // creating token
        const token = jwt.sign({_id:user._id},SECRET);
        // putting token in cookies
        res.cookie("token",token,{expire: new Date()+9999})
        
        // sending response to frontend
        const{ _id,username}=user;
        // to know user is loggedin
        return res.json({token,user:{
            _id,username
        }});
    })
};
exports.signout = (req, res) => {
    res.clearCookie("token");
     res.json({
        message:"User signout!!!"
    })
}