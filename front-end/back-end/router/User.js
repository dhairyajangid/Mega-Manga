import { JWT_SECRET } from '../config';
import { UserSignin, UserSignup } from '../userValidation';
import {User, Upload} from '../db';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')    
const jwt = require('jsonwebtoken')
const port = 3000;

app.use(express.json());

router.post('/signup', async(req,res)=>{
    const parsed = UserSignup.safeParse(req.body)
    const hashedPassword = bcrypt.hash(password, 10)
    if(!parsed.success){
        return res.status(400).json("error user not exist")
    }
    const Userexist = await User.findOne({
        username: req.body.username
    });
    
    if(Userexist){
        res.status(411).json({
            msg: "user already exist"
        })
    }

    // const user = User.Create({
    //     email: String,
    //     password: String,
    //     firstname: String,
    //     lastname: String,
    // })
    const user = new User({username : String, password: hashedPassword})
    await user.save()

    const UserId = user._id;

    const token = jwt.sign({
        UserId 
    }, JWT_SECRET);

    res.status(201).json({
        msg:"User singup successfully",
        token: token
    })

})

router.post("/signin",async (req,res)=>{
    const {success} = UserSignin.safeParse(req.body);
    if(!success){
        res.status(400).json({
            msg: "user not exist"
        })
    }
    const user = await User.findOne({
        email: String,
        password: String
    })
})




app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
})

