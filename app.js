const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
var flash=require('connect-flash');
var session = require('express-session')//needed for connect-flash to work
var passport=require('passport');

const { ensureAuthenticated } = require('./config/auth');

const app=express();


//passport config
require('./config/passport')(passport);


//use modals
const marioChar = require('./models/mariochar');
const Mariochar=marioChar.MarioChar;

//EJS
app.set('view engine','ejs');

//body-parser
app.use(express.urlencoded({ extended: true }));

//Express-session
app.use(session({ 
    secret: 'secret',
    resave:true,
    saveUninitialized:true,
 }));
 
 //Passport Middleware
 app.use(passport.initialize());
app.use(passport.session());

//connect-flash
app.use(flash());

//global variables(to get different alerts)
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('success_msg');
    res.locals.error_msg=req.flash('error_msg');
    res.locals.error=req.flash('error');
    next();
})


//adding static files like css
app.use('/',express.static(__dirname+"/roots"))
app.use('/',express.static(__dirname+"/public"))




//connect to mongodb
mongoose.set('useUnifiedTopology', true);
mongoose.connect('mongodb://localhost/log',{ useNewUrlParser: true}).then(() => console.log('connected')).catch((err)=>console.log('err'));
// mongoose.connect("mongodb://localhost:27017/blog",{ useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex:true});    



app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/userlogin.js'));
 app.use('/user/:id',ensureAuthenticated, require('./routes/user.js'));
app.use('/publisher/:id',ensureAuthenticated, require('./routes/publisher.js'));
app.use('/publisher', ensureAuthenticated,require('./routes/blog.js'));
app.use("/subscribe",require('./routes/subscribe.js'));



app.listen(5000,console.log('Server is connected to 5000'))
