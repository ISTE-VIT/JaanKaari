const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const {MarioChar,Subscriber}=require("../models/mariochar");
var bodyParser = require('body-parser');//for handling post request
var urlencodedParser = bodyParser.urlencoded({ extended: false });

const jwt = require('jsonwebtoken')

router.use(express.urlencoded({ extended: true }));


router.get('/login',function(req,res){
    res.render('login');
})
router.get('/signup',function(req,res){
    res.render('signup');
})
router.post('/signup',urlencodedParser, function(req,res){
    console.log(req.body);
    const{username,email,password,password2,radio} = req.body;
    let errors=[];

    //check required fields
    if(!username || !email || !password || !password2|| !radio){
        errors.push({msg: 'Please fill in all field'});
    }

    if(password !== password2){
        errors.push({msg: 'Passwords do not match'});
    }
    //check password length
    if(password.length<6){
        errors.push({msg :'Password should be atleast of 6 characters. '})
    }
    if(errors.length>0){
         res.render('signup' ,{errors,username,email,password});
    }else{
        //valiadation passed
        MarioChar.findOne({email:email})
         .then(user => {
             if(user){
                 //user exists
                 errors.push({msg : 'Email is already registered.'})
                 res.render('signup' ,{errors,username,email,password,password2,radio});
             }else{
                 const newUser = new MarioChar({
                     username,
                     email,
                     password,
                     radio,
                     
                 });
            

                 //Hash password
                 bcrypt.genSalt(10,(err,salt) => bcrypt.hash(newUser.password,salt,(err,hash)=>{
                     if(err) throw err;
                     //set password to hashed
                     newUser.password=hash;

                     
                     //save user
                     newUser.save().then(user=>{
                         req.flash('success_msg','You are registered and can log in')
                         res.redirect(`/login`);
                         
                     })
                     .catch(err => console.log(err));
                 }))
             }
         })
    }

});

//Login Handle Post
router.post('/login',(req,res,next)=>{
    const email= req.body.email;
    MarioChar.findOne({email:email})
    .then(user=>{
    
        passport.authenticate('local',{
            successRedirect:`/${user.radio}/${user._id}/dashboard`,
            failureRedirect:'/login',
            failureFlash:true,
    })(req,res,next)
})
        
});

//logout handle
router.get('/logout',(req,res)=>{
    req.logout();
    req.flash('success_msg','You are logged out.');
    res.redirect('/login');
})

module.exports = router;