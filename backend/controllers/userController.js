const bcrypt = require("bcryptjs")
const { User } = require("../modules/modules")
const jwt = require("jsonwebtoken")



//register a user
const setUser = async(req,res)=>{
    try {
    const {name, email, password}= req.body
        if(!name || !email || !password){
            res.status(400).json({message:"please fill all fields"})
        }
        //check if user exist
        const existingUser= await User.findOne({email})
        if(existingUser){
            res.status(400).json({message: 'user already exist', email:email})
        }
        // hash password
        const salt=  await bcrypt.genSalt(10)
        const hashedPassword=  await  bcrypt.hash(password, salt)
    
        //create user
        const user= await User.create({
            name,
            email,
            password: hashedPassword,
        })
        if(user){
            res.status(201).json({
                _id: user.id,
                name:user.name,
                email:user.email,
                token: generateToken(user._id),
            })
        }else{
            res.status(400).json({message: "invalid data"})
        }
    } catch (error) {
        console.log("usercontroler err",error);
    }
    

   
}

// authenticate 
//login amdin
const userLogin = async(req,res)=>{
    const {email, password}= req.body
    try {
   const user= await User.findOne({email})
   if(user && (await bcrypt.compare(password, user.password))){
       res.json({
        name:user.name,
        email:user.email,
        token: generateToken(user._id)
       })
   } else{
       res.json({ status: 400, message:'invalid email or password'})
   }
} catch (error) {
       console.log("not found",error);
    }
}
const generateToken = (id)=>{
    return jwt.sign({id}, process.env.JWT_PRIVATE_KEY, { expiresIn:"30d"})
}

module.exports={
    userLogin,
    setUser,
}