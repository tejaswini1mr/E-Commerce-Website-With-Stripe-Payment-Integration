const mongoose=require("mongoose")
const categorySchema=new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true,
        maxlength:32,
        default:0
    },
    purchase:{
        type:Array,
        default:[]
    }

},{timestamps:true})//it will record time when the values are enterned of this schema and stored in db



module.exports=mongoose.model("category",categorySchema)