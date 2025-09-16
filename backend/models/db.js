const mongoose = require('mongoose');

// creating user schema
const user = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
},{timestamps:true});

const User =  new mongoose.model("User",user);

// creating blog schema
const blog = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    profilepic:{
        type:String,
        required:true
    },
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    ispublished:{
        type:Boolean,
        default:false
    }
})

const Blog = new mongoose.model('Blog',blog);

module.exports= {
    User,Blog
}