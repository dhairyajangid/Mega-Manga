const jwt = require ('jsonwebtoken')
const JWT_SECRET = require('./config')


export const authToken = (req,res,next)=>{
        const token = req.header.autherization.split(" ")[1];
        if(!token || !token.startswith('barer ')){
            res.status(401).json({
                msg :console.log('token is not valid for user')
            })
        }
        try{
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
        }
        catch(err){
            res.status(411).json({
                error: "Invalid token"
            })
        }
};
