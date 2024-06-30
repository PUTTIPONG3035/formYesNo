
const bcrypt = require("bcrypt")
const express = require("express")
const router = express.Router();
const EmployeeModel = require('../models/Employees')
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


const verifyUser = (req, res, next) =>{
    const token = req.cookies.token;
   
    // console.log(token)
    if(!token){
        return res.json({message : "The token was not available", auth : false})
    } else{
        jwt.verify(token, "jwttokenkey", (err, decoded) =>{
            
            if(err){
                res.json({message : "Token is wrong", auth : true})
                next()
            }
            req.decodedToken = decoded
            
            next()
        })
        // console.log("folk")
    }
}

router.get("/", verifyUser, (req, res) =>{
    return res.status(200).json({messsage : 'success', decodedToken : req.decodedToken})
})


router.post('/register', async (req, res) => {
    const { name, email, password } = req.body;


    const user = await EmployeeModel.findOne({ email })
    try{

    if (user) {
        return res.json({ message: "user already existed" })
    }
    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new EmployeeModel({
        name,
        email,
        password: hashpassword

    })
    // EmployeeModel.create(req.body)
    await newUser.save()
    return res.json({ status: true, message: "record register" })

    }catch(err){
        res.json({status: false})
    } 
})



router.post("/login"  , async (req, res) => {
    const { email, password } = req.body;
    console.log(email)
    console.log(password)

    const user = await EmployeeModel.findOne({ email: email })

    if (!user) {
        return res.status(401).json({ message: "user is not registered" })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.status(401).json({ message: "password is incorrect" })
    }

    const token = jwt.sign({ name: user.name, email : user.email }, "jwttokenkey", { expiresIn: '1h' })
    res.cookie('token' , token, { httpOnly: true,  maxAge: 3600000 })
    return res.status(200).json({ status: true, message: "login successfully", token : token })

})


router.post("/forgotpassword", async (req, res) =>{
    const {email} = req.body;
    try{
        const user = await EmployeeModel.findOne({email})
        if(!user){
            return res.json({message : "user not registered"})
        }

        const token = jwt.sign({id: user._id}, "jwttokenkey", {expiresIn : '5m'})
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'flok3035@gmail.com',
              pass: 'zwgs vgtt xeia qtxk'
            }
          });
          const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E")
          var mailOptions = {
            from: 'flok3035@gmail.com',
            to: email,
            subject: 'Reset Password',
            text: `http://localhost:5173/resetPassword/${encodedToken}`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
               return res.json({status : false, message : "error sending sent"})
            } else {
               return res.json({status : true, message : "email sent"})
            }
          });

    }catch(err){
        console.log(err)
    }
})


router.post("/resetpassword/:token", async (req, res) =>{
    const token = req.params.token;
    const {password} = req.body;
    console.log(password)
    console.log(token)

    try{
        const decoded =  jwt.verify(token, "jwttokenkey");
        console.log(decoded)
        const id = decoded.id;


        const hashpassword = await bcrypt.hash(password, 10)
        
        await EmployeeModel.findByIdAndUpdate({_id : id}, {password: hashpassword})
        return res.json({status : true, message : "updated password"})

    }catch(err){
        return res.json("invalid token")
    }

})

router.get("/logout", (req, res) =>{
    res.clearCookie('token')
    return res.json({status : true})
})


exports.router = router