import { JWT_SECRET } from '../config/config';
import { UserSignin, UserSignup } from '../userValidation';
import {User} from '../db';
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt')    
const jwt = require('jsonwebtoken')
const port = 3000;

app.use(express.json());
try{
    router.post('/signup', async(req,res)=>{
    // using the zod input validation here
    const parsed = UserSignup.safeParse(req.body)
    if(!parsed.success){
        return res.status(400).json("invalid input format")
    }
    // hashing the password here using bcrypt
    const hashedPassword = await bcrypt.hash(req.body.password, 10)

    // using mongo query here checking userexist or not
    const Userexist = await User.findOne({
        username: req.body.username
    });

    if(Userexist){
        return res.status(411).json({
            msg: "user already exist"
        })
    }

    // const user = User.Create({
    //     email: String,
    //     password: String,
    //     firstname: String,
    //     lastname: String,
    // })

    // Note
    // here we can use the object destucturing to write it like this 
    // username : req.body.username, to this -> {username}

    const user = new User({
        username : req.body.username,
        password: hashedPassword,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email : req.body.email
    })
    await user.save()

    const userId = user._id;

    const token = jwt.sign(
        {
          userId,
          email: user.email
        },
        JWT_SECRET,
        {expiresIn: "1h"}
    );

    res.status(201).json({
        msg:"User singup successfully",
        token: token
    })

})
} catch(err){
    console.log(err);
    res.status(500).json({
        msg: "server error"
    })
}




router.post("/signin",async (req,res)=>{
    const parsed = UserSignin.safeParse(req.body);
    
    if(!parsed.success){
        return res.status(400).json({
            msg: "user not exist"
        })
    }
    const {email, password} = parsed.data;

    const user = await User.findOne({email}); // here this email is check by zod validation thats why it in {}

    if(!user){
        return res.status(404).json({
            msg: "user not found"
        })
    }

    const isCheck = await bcrypt.compare(password, user.password);
    if(!isCheck){
        return res.status(401).json({ msg: "Incorrect password" });
    }
    
    const token = jwt.sign({
        userId: user._id,
        email: user.email
    },JWT_SECRET,
    {expiresIn: "1h"});

    res.json({
        token: token
    })
    
})




app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
})

