var express = require('express')
var router = express.Router()
const { check } = require('express-validator');


const {signout,signup,signin,isSignedIn}=require("../controllers/auth")//route for register
router.post("/signup",[
    check("name","must be at least 3 chars long").isLength({ min: 3 }),
    check("email","email is required").isEmail(),
    check("password","password should be at list 3 char").isLength({min:3})
],
signup)
router.post("/signin",[//route for signin(login)
    check("email","email is required").isEmail(),
    check("password","password feald is required ").isLength({min:1})
],
signin)

router.get("/signout",signout)//route for signout

router.get("/testrouter",isSignedIn,(req,res)=>{
res.json(req.auth)
})

module.exports=router;