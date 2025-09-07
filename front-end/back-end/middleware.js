const jwt = require ('jsonwebtoken')
const JWT_SECRET = require('./config')


const authToken = (req,res,next)=>{
    try{
        const authHeader = req.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')){
            return res.status(401).json({
                msg :'token is not valid for user'
            })
        }

        const token = authHeader.split(" ")[1];

        
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
        catch(err){
            return res.status(403).json({
                error: "Invalid token"
            })
        }
};
module.exports = authToken;