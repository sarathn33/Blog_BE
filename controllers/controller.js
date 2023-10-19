import mongoose from "mongoose";
import Blog from "../model/blogSchema.js";
import User from "../model/userSchema.js";

export const createBlog=async(req,res)=>{
    const {posterUrl,title,description,author,createdDate} = req.body;
    let existingUser;
    try {
        existingUser=await User.findById(author)
    } catch (error) {
        console.log(error)
    }
    const blog=new Blog({
        posterUrl,
        title,
        description,
        createdDate:new Date(createdDate),
        author,
    })
    try {
       const session = await mongoose.startSession();
       session.startTransaction();
       await blog.save({session})
       existingUser.blogs.push(blog)
       await existingUser.save({session})
       await session.commitTransaction();

    } catch (error) {
        res.status(404).send("Error occured creating new blog",error)
    }
        return res.status(200).send({blog})
}

export const getAllBlogs=async(req,res)=>{
    const blog=await Blog.find()
    try {
        res.status(200).send(blog)
    } catch (error) {
        res.status(404).send("Error occured fetching all blogs",error)
    }
}

export const deleteBlog=async(req, res) => {
    const id =req.params.id
    let blog;
    blog= await Blog.findByIdAndRemove(id).populate("author")
    await blog.author.blogs.pull(blog)
    await blog.author.save()

    try {
        res.status(200).send("Blog deleted successfully")
    } catch (error) {
        res.status(404).send("Error occured deleting blog",error)
    }
}
export const updateBlogs=async(req,res)=>{
    const {id}=req.params.id;
    const{posterUrl,title,description,createdDate}=req.body;
    const blog=await Blog.findOneAndUpdate(id,{...req.body},{new:true})
    try {
        res.status(200).send(blog)
    } catch (error) {
        res.status(404).send("Error occured updating blog",error)
    }
}

export const getBlogById = async(req, res) =>{
const authorId=req.params.id;
let authorBlogs;

try {
    authorBlogs=await User.findById(authorId).populate("blogs")
} catch (error) {
    console.log(error)
}
if(!authorBlogs){
    return res.status(404).send({message:"No Blogs Found"})
}
    return res.status(200).send({blogs: authorBlogs})
}