import { UserSchemazod } from '../userValidation';
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

app.post('/signup', async(req,res)=>{
    const parsed = UserSchemazod.safeparse(req.body)
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

    const user = User.Create({
        email: String,
        password: String,
        firstname: String,
        lastname: String,
    })
    const UserId = user._id;
    

})

app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
})

