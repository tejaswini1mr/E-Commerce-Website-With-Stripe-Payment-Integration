const User=require("../models/user");
const Order=require("../models/order")

exports.getUserById=(req,res,next,id)=>
{

    User.findById(id).exec((err,user)=>{
        if(err||!user){
            return res.status(400).json({
                error:"no user was found in db"
                
            })

    }
    req.profile=user;
    next();
})
}


exports.getUser=(req,res)=>{
    req.profile.salt=undefined;//this 2 are sensitive information so no need to display in user profile 
    req.profile.encry_password=undefined
    return res.json(req.profile)
}
exports.updateuser=(req,res)=>{
    User.findByIdAndUpdate(
        {_id : req.profile._id},
        {$set :req.body},
        {new : true,useFindAndModify : false},
        (err,user)=>{
            if(err)
            {
                return res.status(400).json({
                    error:"u r not authorised to upadte this infoemation"
                })
            }
           user.salt=undefined;//this 2 are sensitive information so no need to display in user profile 
            user.encry_password=undefined
            res.json(user)
        }
        
        
        )
}
exports.userpurchaselist=(req,res)=>{
    User.find({user:req.profile._id})
    .populate("user","_id name")
    .exec((err,order)=>{
        if(err){
            return res.status(403).json({
                error:"no order in this account"
            })
        }
        return res.json(order)
    })
}

exports.pushOrderInPurchaseList=(req,res,nest)=>{
    let purchases=[]
    req.body.order.products.array.forEach(product =>{
        purchases.push({
            _id:product._id,
            name:product.name,
            description:product.description,
            category:product.category,
            quantity:product.quantity,
            transaction_id:req.body.order.transaction_id
        })
    })
 //store it in db
 user.findByIdAndUpdate(
     {_id:req.profile._id},
     {$push:{purchases:purchases}},
     {new:true},
     (err,purchase)=>{
         if(err){
             return res.status(400).json({
                 error:"unable to save purchase"
             })
         }
         next()
     }
     
 )       

   
}