const express = require('express');
const User = require('../models/User');
const router = express.Router();
const {body,validationResult} = require('express-validator');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const jsonWebToken = require('jsonwebtoken');
const JWT_SECRET = '$$&*hahfhkj%#&6732qg';
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
                    cid:'./images/1.jpg'
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