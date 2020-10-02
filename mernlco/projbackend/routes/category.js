const express=require("express")
const router=express.Router()


const {getCategoryById,createCategory,getCategory,getAllCategory,update,removeCategory}=require("../controllers/category")
const {isAdmin,isAuthenticated,isSignedIn}=require("../controllers/auth")
const {getUserById}=require("../controllers/user")
router.param("userId",getUserById)
router.param("categoryId",getCategoryById)




//actual routes goes here
//create route
router.post("/category/create/:userId",isSignedIn,isAuthenticated,isAdmin,createCategory)
//read 
router.get("/category/:categoryId",getCategory)
router.get("/category/",getAllCategory)
//update
router.put("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,update)
//delete
router.delete("/category/:categoryId/:userId",isSignedIn,isAuthenticated,isAdmin,removeCategory)






module.exports=router;