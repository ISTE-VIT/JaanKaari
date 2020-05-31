const express = require('express');
const router = express.Router();
const post = require('../models/posts')
const MarioChar = require('../models/mariochar');
const { ensureAuthenticated } = require('../config/auth');



router.get('/',function(req,res){
    res.render('home');
})
 router.get(`/dashboard`, ensureAuthenticated,function(req,res){
     res.render('homedash',{user:req.user});
 })

router.get('/store',ensureAuthenticated,function(req,res){
    res.render('store');
})
//blogs part
router.get("/blog",function(request,response){
    
    post.find({},function(err,foundtpost){
        
            if(err)
            console.log(err);
            else
            response.render("bloguser",{post: foundtpost});
        });
    
});
router.get("/post/:id",ensureAuthenticated,function(request,response){
    const search=request.params.id;
    post.findOne({_id: search},function(err,finditem){
       response.render("posts",{title: finditem.title,postBody: finditem.postBody,picname: finditem.picname,author:finditem.authorname});
    });
});

router.get('/contribute',function(req,res){
    res.render('contribute');
})

module.exports = router;