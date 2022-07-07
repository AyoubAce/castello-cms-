const jwt = require("jsonwebtoken")
const {User}= require("../modules/modules")

const protect= async(req,res, next)=>{
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        try {
            //get token
            token= req.headers.authorization.split(" ")[1]
            //verify token
            const decodeToken= jwt.verify(token, process.env.JWT_PRIVATE_KEY)
            req.user = await User.findById(decodeToken.id).select("-password")
            next()
        } catch (error) {
            console.log("protect error",error)
            res.status(401).json({message: "not autorized", error,})            
        }
    }
    if(!token){
        res.status(401).json({message: "not autorized , no token found"}) 
    }
}

module.exports= {protect}