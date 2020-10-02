require("dotenv").config();
const mongoose = require('mongoose');
const express=require("express")
const bodyParser=require("body-parser")
const cookieParser=require("cookie-parser")
const cors=require("cors")
const app=express()

//my routes

const authRoutes =require("./routes/auth")//Then, load the router module in the app:
const userRoutes=require("./routes/user")
const categoryRoutes=require("./routes/category")
const productRoutes=require("./routes/product")
const orderRoutes=require("./routes/order")
const stripeRoutes=require("./routes/stripePayment")


//DB connection
mongoose.connect(process.env.DATABASE,{//.env is the file and database is variable in .env process is the one which do work 
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true

}).then(()=>{
    console.log("DB CONNECTED")
})

//middlewares
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())

//my routs
app.use("/api",authRoutes)//prefix for all route path 
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api",orderRoutes);
app.use("/api",stripeRoutes);



//ports
 const port=process.env.PORT || 8000;

 //starting a server
 app.listen(port,()=>{
     console.log(`app is rummimg at ${port}`)
 })