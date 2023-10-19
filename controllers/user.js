import bcrypt from "bcryptjs";
import User from "../model/userSchema.js"


//sign up  new user
export const signUp=async (req,res)=>{
    const {name,email,password}=req.body;
    let existingUser
    try {
        existingUser= await User.findOne({email})
    } catch (error) {
        console.log(error);
    }
    
    if(existingUser){
    return res.status(420).json({message:"User already exists"});
}else{
    const hashedPassword=bcrypt.hashSync(password)
let user;
try {
    user = new User({name,email,password:hashedPassword,blogs:[]})
    user = await user.save()
} catch (error) {
    console.log(error,"Error saving signup details")
}
if (!user){
    return res.status(500).json({message:"Unexpected Error Occured"})
}
return res.status(201).json({user})
}
}
//get all user

export const getAllUsers =async(req,res)=>{
    const user=await User.find()
    try {
        res.status(200).send(user)
    } catch (error) {
        res.status(404).send("Error occured fetching all blogs",error)
    }
}

//login user

export const login=async(req, res, next) => {
    const {email,password}=req.body;

    if(email===" " && password===" "){
        return res.status(422).send({message:"Invalid inputs"})
    }

    let existingUser;
    try {
       existingUser =await User.findOne({email})
    } catch (error) {
      console.log(error)  
    }

    if(!existingUser){
        return res.status(400).json({message:"User not found"})
    }

    const correctpassword=bcrypt.compareSync(password,existingUser.password)

    if(!correctpassword){
        return res.status(400).json({message:"Invalid Password"})
    }

    return res.status(200).json({message:"Login successful",id:existingUser._id})
   
}
