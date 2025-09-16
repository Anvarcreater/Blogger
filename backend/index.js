const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const router = require('./controllers/blog');
const cors = require('cors');
const cookie = require('cookie-parser');
const path = require('path');

const app = express();

dotenv.config();

app.use(express.json());
app.use("/public/images",express.static(path.join(__dirname,"public/images")));
app.use(cors(({
    origin:[process.env.FRONT],
    credentials:true
})))
app.use(cookie());

app.use(router);

// Connecting Mongodb Database
mongoose.connect(process.env.MONGODB).then(()=>{
    console.log("database connnected...!");
}).catch((err)=>{
    console.log(err);
})


app.listen(process.env.PORT,()=>{
    console.log('server is running...!');
})
