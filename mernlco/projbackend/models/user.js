const mangoose=require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

var userSchema=new mangoose.Schema({
    name:{
        type:String,
        required:true,
        maxlength:32,
        trim:true,
    },
    lastname:{
        type:String,
        maxlength:32,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
    },
    encry_password:{
        type:String,
        required:true,
        
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    userInfo:{
        type:String,
        trim:true,
    },
    purchases:{
        type:Array,
        default:[],

    }


},{timestamps:true})

userSchema.virtual("password")
    .set(function(password){
        this._password=password
        this.salt=uuidv1()//is the way to populate the salt
        this.encry_password=this.securePassword(password);

    })
    .get(function(){
        return this._password
    })



userSchema.methods={
    autheticate:function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password
    },
    securePassword:function(plainpassword)//converting plain password to secure password
    {
        if(!plainpassword) return "";
        try{

            return crypto.createHmac('sha256', this.salt)
            .update(plainpassword)
            .digest('hex');
        }catch(err){
            return "";
        }
    }
}
module.exports=mangoose.model("user",userSchema)