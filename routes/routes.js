import { Router } from "express";
import { createBlog, deleteBlog, getAllBlogs, getBlogById, updateBlogs } from "../controllers/controller.js";
import { getAllUsers, login, signUp } from "../controllers/user.js";

export const createBlogRoute=Router().post("/",createBlog)
export const getAllBlogsRoute=Router().get("/",getAllBlogs)
export const getBlogByIdRoute=Router().get("/:id",getBlogById)
export const deleteBlogRoute=Router().delete("/:id",deleteBlog)
export const updateBlogRoute=Router().put("/:id",updateBlogs)
export const signUpRoute=Router().post("/signup",signUp)
export const getAllUserRoute=Router().get("/users",getAllUsers)
export const loginRoute=Router().post("/login",login)