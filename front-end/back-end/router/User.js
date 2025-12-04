    import { UserSignin, UserSignup } from '../userValidation.js';
    import { User } from '../db.js';
    import signinLimiter from '../middleware/rateLimite.js';
    import express from 'express';
    import bcrypt from 'bcrypt';
    import jwt from 'jsonwebtoken';
    import dotenv from 'dotenv';

    dotenv.config();

    const router = express.Router();

    // app.use(express.json());

        router.post('/signup', async(req,res)=>{
        // using the zod input validation here
        const parsed = UserSignup.safeParse(req.body)
        if(!parsed.success){
            return res.status(400).json("invalid input format")
        }

        const { firstname, lastname, email, password, username } = parsed.data;

        // hashing the password here using bcrypt
        const hashedPassword = await bcrypt.hash(password, 10)

        // using mongo query here checking userexist or not
        const Userexist = await User.findOne({
            $or: [{ email }, { username }]
        });

        if(Userexist){
            return res.status(409).json({
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
        UserName: username,
        firstName: firstname,
        lastName: lastname,
        password: hashedPassword,
        email   
        });

        await user.save()

        const userId = user._id;

        const token = jwt.sign(
            {
            userId,
            email: user.email
            },
            process.env.JWT_SECRET,
            {expiresIn: "1h"}
        );

        res.status(201).json({
            msg:"User singup successfully",
            username: user.UserName,
            artistName: user.firstName + "_" + user.lastName,
            avatar: user.avatar,
            token: token
        })


    })


    router.post("/signin",signinLimiter,async (req,res)=>{
        try{const parsed = UserSignin.safeParse(req.body);
        
        if(!parsed.success){
            return res.status(400).json({
                msg: "invalid input"
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
        }, process.env.JWT_SECRET,
        {expiresIn: "1h"});

        res.json({
            username: user.UserName,
            artistName: user.firstName + "_" + user.lastName, 
            avatar: user.avatar,
            token: token
        })
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ msg: "server error" });
        }
        
    });


    export default router;