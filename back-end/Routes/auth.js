const express = require('express');
const User = require('../models/User');
const dotenv = require('dotenv')
dotenv.config();
const router = express.Router();
const {body,validationResult} = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;
const hbs = require('nodemailer-express-handlebars');
const path = require('path');




// Define NodeMailer here:- 

let transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"rickeyrickey747@gmail.com",
        pass:"lcvmcenyexadsbwf"
    }
})

const handlebarOptions = {
    viewEngine:{
        extName:".handlebars",
        partialsDir:path.resolve('./views'),
        defaultLayout:false
    },
    viewPath:path.resolve('./views'),
    extName:".handlebars"
}

transporter.use('compile' , hbs(handlebarOptions))

router.post('/' , [body('email').isEmail(),body('name').exists(),body('password').isLength({min:6})] ,async (req,res) => {
    try {
        const errors = validationResult(req);
        console.log(errors)
        if(!errors.isEmpty()) {
        return res.status(400).json({error:"The values cannot be empty"})}
        const {name,email,password} = req.body;

        let mailoptions = {
            from:"Rickeyrickey747@gmail.com",
            to:req.body.email,
            subject:`Welcome Email From Britacel || ${name}`,
            template:'email',
            context: {
                name:name
            },
            attachments:[
                {
                    __filename:'1.jpg',
                    path:"./views/images/1.jpg",
                    cid:'/images/1.jpg'
                },
                {
                    __filename:'2.jpg',
                    path:"./views/images/2.jpg",
                    cid:'/images/2.jpg'
                },
                {
                    __filename:'3.jpg',
                    path:"./views/images/3.jpg",
                    cid:'/images/3.jpg'
                },
                {
                    __filename:'4.jpg',
                    path:"./views/images/4.jpg",
                    cid:'/images/4.jpg'
                },
                {
                    __filename:'6.jpg',
                    path:"./views/images/6.jpg",
                    cid:'/images/6.jpg'
                },
                {
                    __filename:'5.jpg',
                    path:"./views/images/5.jpg",
                    cid:'/images/5.jpg'
                },
                {
                    __filename:'banner.jpg',
                    path:"./views/images/banner.jpg",
                    cid:'/images/banner.jpg'
                },
                {
                    __filename:'banner.jpg',
                    path:"./views/images/banner.jpg",
                    cid:'/images/banner.jpg'
                },
                {
                    __filename:'black-twitter.png',
                    path:"./views/images/black-twitter.png",
                    cid:'/images/black-twitter.png'
                },
                {
                    __filename:'black-instagram.png',
                    path:"./views/images/black-instagram.png",
                    cid:'/images/black-instagram.png'
                },
                {
                    __filename:'black-facebook.png',
                    path:"./views/images/black-facebook.png",
                    cid:'/images/black-facebook.png'
                },
                {
                    __filename:'black-youtube.png',
                    path:"./views/images/black-youtube.png",
                    cid:'/images/black-youtube.png'
                },
                {
                    __filename:'white-instagram.png',
                    path:"./views/images/white-instagram.png",
                    cid:'/images/white-instagram.png'
                },
                {
                    __filename:'white-youtube.png',
                    path:"./views/images/white-youtube.png",
                    cid:'/images/white-youtube.png'
                },
                {
                    __filename:'white-twitter.png',
                    path:"./views/images/white-twitter.png",
                    cid:'/images/white-twitter.png'
                },
                {
                    __filename:'white-facebook.png',
                    path:"./views/images/white-facebook.png",
                    cid:'/images/white-facebook.png'
                }
            ]
        }
        

         // Check if the user already exists with request body in the database.
         let user = await User.findOne({email:req.body.email})
         if (user) {
             return res.status(400).json({error:`user with this ${req.body.email} Already exists`})
         } else {
             const salt = await bcrypt.genSalt(10);
             let securePassword = await bcrypt.hash(req.body.password,salt);
             user = User({...req.body,password:securePassword});
             await user.save();
             const data = {
                 user:{
                     id:user.id
                 }
             }
             const authToken = jsonWebToken.sign(data,JWT_SECRET)
             transporter.sendMail(mailoptions, (error , info) => {
                if (error) {
                    console.log(error)
                } else {
                    console.log("email send" + info.response)
                    res.status(200).json({msg:`An Email has been sent to your registered mail Id:- ${req.body.email}`})
                }
             })

             res.status(200).json({authToken,msg:"Account Registered Successfully"});
         }
    } catch (error) {
        console.log(error);
    }
})


module.exports = router;