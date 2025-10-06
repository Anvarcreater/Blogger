const express = require('express');
const {User,Blog} = require('../models/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { default: mongoose } = require('mongoose');

const router = express.Router();

//  Authentication API's 

router.post('/signup',async (req,res)=>{
    const {email,password}= req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "" ){
        return res.json({message:"email or password should not be empty..."});
    }else if (password.length <7){
        return res.json({message:"password length should not be less than 8 character"});
    }else{
        const email_id = await User.findOne({email});
        if (email_id){
            return res.json({message:"user already exist...!"});
        }
        const hashedpassword = await bcrypt.hash(password,10);
        const newuser = new User({
            email,
            password:hashedpassword,
        })
        await newuser.save();
        return res.json({message:"signing in successfully",status:true});
    }
})

router.post('/login',async(req,res)=>{
    const {email,password}= req.body;
    if (!email || !password || email.trim() === "" || password.trim() === "" ){
        return res.json({message:"email or password should not be empty..."});
    }
    const user = await User.findOne({email});
    if (!user){
        return res.json({message:"user not found",status:false});
    }
    try{
        const validpassword = await bcrypt.compare(password,user.password);
        if(!validpassword){
            return res.json({message:"incorrect password",status:false});
        }else{
            const token = jwt.sign({id:user._id,email:user.email},process.env.SECRETKEY,{expiresIn:'1h'});
            res.cookie("token",token,{httpOnly:true,maxAge:3600000,secure:true,sameSite:"strict"});
            return res.json({status:true,message:"login succesfully"});
        }
    }catch(err){
        return res.json({ message: "Something went wrong during authentication", status: false });
    }

})

// Logout API
router.post('/logout',async(req,res)=>{
    res.clearCookie('token');
    return res.json({message:"logout successfully",status:true});
})

// checking Authorization API (Verfifying user is login or not ) 
const verifyuser = async(req,res,next)=>{
    try{
        const token = req.cookies.token;
        if(!token){
            return res.json({status:false,message:"Login first"});
        }
        const decoded =await jwt.verify(token,process.env.SECRETKEY);
        next();

    }catch(err){
        return res.json(err);
    }
}

router.get('/verify',verifyuser,async(req,res)=>{
    return res.json({message:"Authorized",status:true});
})

// setup storage for storing blog images using multer package
const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'public/images')
    },
    filename:(req,file,cb)=>{
        cb(null,file.fieldname + "_" + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage:storage
})
// blog creation API
router.post('/createblog',upload.single('file'),async(req,res)=>{
    const token = req.cookies.token;
   const  {title,category,description} = req.body;
   try{
        if (!title || !category || !description || title.trim() === "" || description.trim() === "" || category.trim() === "" ){
            return res.json({status:false,message:"Input fields should not be empty....!"});
         }
        const decoded = await jwt.verify(token,process.env.SECRETKEY);
        const id = decoded.id;
        const newblog = new Blog({
            title,
            category,
            description,
            profilepic:req.file.filename,
            userid:id 
        })
        await newblog.save();
        res.json({message:"Blog created",status:true});
   }catch(err){
        res.json({status:false,message:"Invalid token or login again"});
   }
    console.log(req.file.filename);
})

// Getting all blogs from db
router.get('/blogs',async(req,res)=>{
    try{
        const Allblogs = await Blog.find({ispublished:true});
        return res.json({status:true,data:Allblogs,message:"successfully retrieved"});
    }catch(err){
        return res.json({message:err,status:false})
    }
})

// Getting specified user blogs and their draft blogs (which is not published)
router.get('/myblogs',async(req,res)=>{
    const token = req.cookies.token;
    try{
        const decoded = await jwt.verify(token,process.env.SECRETKEY);
        const id = decoded.id;
        const myblogs = await Blog.find({userid:id,ispublished:true});
        const mydraft = await Blog.find({userid:id,ispublished:false})
        if(myblogs.length===0){
            return res.json({message:"No blogs created yet",status:false});
        }
        return res.json({message:"successfully retrieved",status:true,data:myblogs,mydraft:mydraft});
    }catch(err){
        return res.json({message:err,status:false})
    }
})

// fetching specific blog for View component also fetching related blogs using its category 
router.get('/viewblog/:id',async(req,res)=>{
    const id = req.params.id;
     try{
        const details = await Blog.findById({_id:id});
        if (!details){
            return res.json({messsage:"Blog not found",status:false});
        }
        const related = await Blog.find({ispublished:true ,category:details.category,_id:{$ne: new mongoose.Types.ObjectId(id)}});
        return res.json({status:true,data:details,category:details.category,relatedblogs:related,message:"view post details"})
    }catch(err){
        return res.json({message:err});
    }
})

// blog editing API
router.put('/editblog/:id',upload.single('file'),async(req,res)=>{
    const id = req.params.id;
    const   {title,category,description} = req.body;
    try{
        const blog = await Blog.findById({_id:id});
        if (!blog){
            return res.json({status:false,message:"Blog not found"});
        }
        if (req.file){
            if (blog.profilepic){
                const oldpic = path.join(__dirname,"../public/images",blog.profilepic);
                if (fs.existsSync(oldpic)){
                    fs.unlinkSync(oldpic);
                }
            }
            blog.profilepic=req.file.filename;
        }
            blog.title=title || blog.title;
            blog.category=category || blog.category;
            blog.description=description || blog.description;
            await blog.save();
            return res.json({message:"Blog updated successfully",status:true}); 
        
    }catch(err){
        return res.json({message:err,status:false})
    }
})

// Publishing blog API
router.put('/publish/:id',async(req,res)=>{
    const id=req.params.id;
    const {publish} = req.body;
    try{
        await Blog.findByIdAndUpdate({_id:id},{ispublished:publish});
        return res.json({status:true,message:"Blog published"});
    }catch(err){
        return res.json({error:err});
    }
})

// Delete blogs API
router.delete('/deleteblog/:id',async(req,res)=>{
    const id = req.params.id;
    try{
        const blog= await Blog.findById({_id:id});
        if (!blog){
            return res.json({message:"invalid id",status:false});
        }
        if(blog.profilepic){
            const imagepath = path.join(__dirname,"../public/images",blog.profilepic);
            fs.unlink(imagepath,(err)=>{
                if(err){
                    console.log(err);
                }else{
                    console.log("blog image deleted");
                }
            })
        }
        await Blog.findByIdAndDelete({_id:id});
        return res.json({status:true,message:"blog deleted successfully"});
    }catch(err){
        return res.json({message:err,status:false})
    }
})

// search API (filter blogs from all blogs using its category,title,description)
router.post('/search',async(req,res)=>{
    const {query} = req.body;
    try{
        const value = query.trim().toLowerCase();
        const blogs = await Blog.find({
            $or: [
                { title: { $regex: value, $options: "i" } },
                { category: { $regex: value, $options: "i" } },
                { description: { $regex: value, $options: "i" } }
            ]
        });
        return res.json({status:true,data:blogs,message:"result"});
    }catch(err){
        return res.json({message:err});
    }
})

module.exports=router;