import mongoose from 'mongoose';

const blogSchema= new mongoose.Schema({
    posterUrl:{
        type:String,
        required:true,
    },
    title:{
        type:String,
        required:true,
        },
    description:{
        type:String,
        required:true,
    },
    createdDate:{
        type:Date,
        required:true
    },
    author:{
        type:mongoose.Types.ObjectId,
        ref:"User",
        required:true
    },
})

export default mongoose.model("Blog",blogSchema);