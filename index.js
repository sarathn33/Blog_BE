import express from "express";
import  cors from "cors";
import * as dotenv from "dotenv";
import mongoose from "mongoose";
import { createBlogRoute, deleteBlogRoute, getAllBlogsRoute, getAllUserRoute, getBlogByIdRoute, loginRoute, signUpRoute, updateBlogRoute } from "./routes/routes.js";


//middlewares
const app = express();
app.use(express.json());
app.use (cors());
dotenv.config();

//db connection
mongoose.connect(process.env.MONGO_URL,{useNewUrlParser:true})
.then(()=>console.log("Database connection established"))
.catch((error)=>console.log("Database Connection Error",error))


//start page
app.get("/",(req,res)=>{
    res.status(200).send("Welcome to blog app!");
})

//routes
app.use("/blog",createBlogRoute)
app.use("/blog",getAllBlogsRoute)
app.use("/blog",getBlogByIdRoute)
app.use("/blog",deleteBlogRoute)
app.use("/blog",updateBlogRoute)
app.use("/user",signUpRoute)
app.use("/user",loginRoute)
app.use("/user",getAllUserRoute)

app.listen(process.env.PORT,()=>console.log("Server listening on port "+ process.env.PORT))