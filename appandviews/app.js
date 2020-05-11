const express=require("express");
const app=express();


const mongoose=require("mongoose");
mongoose.connect("mongodb://localhost:27017/blog",{ useNewUrlParser: true, useUnifiedTopology: true});
const postsSchema=new mongoose.Schema({
    title: String,
    postBody: String,
    update: String,
    picname: String
});
const post=mongoose.model("post",postsSchema);

const messagesSchema=new mongoose.Schema({
    que: String,
    by: String
});
const message=mongoose.model("message",messagesSchema);



var _ = require('lodash');
const bodyParser=require("body-parser");
app.use(express.static("./public")); 
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));


app.get("/",function(request,response){
    post.find({},function(err,foundtpost){
        
            if(err)
            console.log(err);
            else
            response.render("home",{post: foundtpost});
        });
    
});


app.get("/post/:topic",function(request,response){
    const search=request.params.topic;
    post.findOne({_id: search},function(err,finditem){

        response.render("posts",{title: finditem.title,postBody: finditem.postBody,picname: finditem.picname});
    });
});


app.post("/message",function(request,response){
    response.render("messages");
});

app.post("/uploadmessage",function(request,response){
    const newmessage= new message({
        que: request.body.question,
        by: request.body.by
    });
    newmessage.save(function(err){
        if(!err)
        {
            console.log(request.body.question);
            response.redirect("/");
        }
    });
});

app.listen(3000,function(){
    console.log("server is up and running");
});