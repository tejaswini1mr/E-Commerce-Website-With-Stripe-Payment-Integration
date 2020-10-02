const user=require("../models/user")
const { check, validationResult } = require('express-validator');
var jwt=require('jsonwebtoken');
var expressJwt=require('express-jwt');

exports.signup=(req,res)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    
    const User = new user(req.body)
    User.save((err,user)=>{ //it will save in database 
        if(err){
            return res.status(400).json({
               err :"not able to save user in DB"})
            }

            res.json({
                name:user.name,
                email:user.email,
                id:user._id
            })
        })

}

exports.signout=(req,res)=>{
    //res.send("user signout success")
    res.clearCookie("token")
    res.json({
        message:"user signout success"
    })
}
exports.signin=(req,res)=>{
    const errors=validationResult(req);
    const {email,password}= req.body
    if(!errors.isEmpty()){
        return res.status(422).json({
            error:errors.array()[0].msg
        })
    }
    user.findOne({email},(err,user)=>{
        if(err||!user){
            res.status(400).json({
                error:"USER email does not exist"
            })
        }
        if(!user.autheticate(password)){
            res.status(401).json({
                error:"email and password do not match"
            })
        }
//create token
        const token=jwt.sign({_id:user._id},process.env.SECRET)
        //put token in cookie
        res.cookie("token",token,{expire:new Date()+9999});
        //send respond to front end

        const{_id,name,email,role}=user;
        return res.json({token,userz:{_id,name,email,role}})
    })
}
//protected route by using body and cookie parser we can get some metods
exports.isSignedIn=expressJwt({
    secret:process.env.SECRET,
    userProperty:"auth"

})




//custom middel ware
exports.isAuthenticated=(req,res,next)=>
{
    let checker=req.profile&&req.auth && req.profile._id==req.auth._id;
    if(!checker){
        return res.status(403).json({
            error:"ACCESS Denaied"
        })

    }

    next()
}
exports.isAdmin=(req,res,next)=>
{
    if(req.profile.role===0){
        return res.status(403).json({
            error:"you are not ADMIN, ACESS DENAID"
        })
    }

    next()
}