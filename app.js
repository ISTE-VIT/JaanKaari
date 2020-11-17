const express = require('express');
const path = require('path')
const mongoose = require('mongoose');
var flash=require('connect-flash');
var session = require('express-session')//needed for connect-flash to work
var passport=require('passport');

const { ensureAuthenticated } = require('./config/auth');

const app=express();


require("dotenv").config();
//passport config
require('./config/passport')(passport);


//use modals
const MarioChar = require('./models/mariochar');

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
const MONGOURI = process.env.MONGOURI;
mongoose.connect(MONGOURI, {useNewUrlParser: true,useCreateIndex: true,useUnifiedTopology: true,})
.then(() => console.log("Connected to database"))
.catch((err) => console.log(err));
mongoose.Promise = global.Promise;


app.use('/', require('./routes/index.js'));
app.use('/', require('./routes/userlogin.js'));
 app.use('/user/:id',ensureAuthenticated, require('./routes/user.js'));
 app.use('/user/:id',ensureAuthenticated, require('./routes/subscribe.js'));
 app.use('/publisher/:id',ensureAuthenticated, require('./routes/subscribe.js'));
app.use('/publisher/:id',ensureAuthenticated, require('./routes/publisher.js'));
app.use('/publisher', ensureAuthenticated,require('./routes/blog.js'));



app.listen(5000,console.log('Server is connected to 5000'))
