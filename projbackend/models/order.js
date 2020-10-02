const mongoose=require("mongoose");

const{ObjectId}=mongoose.Schema

const ProductCartSchema=mongoose.Schema({
    prodect:{
        type:ObjectId,
        ref:"Prodect"
    },
    name:String,
    count: Number,
    prise: Number,
})
const ProductCart = mongoose.model("Productcart",ProductCartSchema)//need to throu out 
const OrderSchema=mongoose.Schema({
    products:[ProductCartSchema],
    transaction_id:{},
    amount:{type:Number},
    address:String,
    status:{
        type:String,
        default:"Recieved",
        enum:["Cancelled","Delivered","Shipped","Processing","Recieved"]
    },
    updated:Date,
    user:{
        type:ObjectId,
        ref:"User"
    }
    
},
{timestamp:true});

const Order = mongoose.model("Order",OrderSchema);
module.exports={Order,ProductCart};