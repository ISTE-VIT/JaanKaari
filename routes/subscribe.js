const express=require("express");
const router=express();
const bodyParser=require("body-parser");
const path = require('path')
const multer = require('multer');
const nodemailer = require('nodemailer');
const {MarioChar,Subscriber}=require("../models/mariochar");
var _ = require('lodash');
const { ensureAuthenticated } = require('../config/auth');
const auth=require("../config/key");

router.post("/post/subscribe",ensureAuthenticated,function(request,response){
    let flag=0;
    const mail=request.body.mail;
    MarioChar.find({email:request.user.email},function(err,found){
        console.log(found[0].subscriber);
        for(var i=0;i<found[0].subscriber.length;i++){
            if(found[0].subscriber[i].subscriber===mail)
            {
                flag=1;
                break;
            }
        }
        if(flag===1)
        response.send("already subscribed");
        else
        {
            const output=request.user.username+" has subcribed to your blog!";
    const newSubscriber=new Subscriber({
        subscriber:mail
    });
    newSubscriber.save();
    const newSubscriber2=new Subscriber({
        subscriber:request.user.email
    });
    newSubscriber2.save();
    MarioChar.update({email:mail},{$push:{subscriber:newSubscriber2}},function(err){
        if(err)
        console.log(err);
      });
      MarioChar.update({email:request.user.email},{$push:{subscriber:newSubscriber}},function(err){
        if(err)
        console.log(err);
      });

    let transporter = nodemailer.createTransport({
        host:  "smtp.gmail.com",
        port: 587,
        secure: false, 
        auth: {
            user: auth.user, 
            pass: auth.pass  
        },
        tls:{
          rejectUnauthorized:false
        }
      });
    
      let mailOptions = {
          from: '"Jaankaari" <jaankaariiste82@gmail.com>', 
          to: mail, 
          subject: 'New Subscriber!', 
          text: 'Hello world?', 
          html: output
      };
    
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message sent: %s', info.messageId);   
          console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      });
      response.send("subscribed");
        }
    });
    
    

});

module.exports=router;