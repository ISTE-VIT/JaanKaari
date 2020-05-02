const express = require('express');
const router = express.Router();
const post = require('../models/posts')
const { ensureAuthenticated } = require('../config/auth');



router.get('/dashboard',function(req,res){
    res.render('dashboard',{user:req.user});
})

router.get("/blog",function(request,response){
    post.find({},function(err,foundtpost){
        
            if(err)
            console.log(err);
            else
            response.render("blog",{post: foundtpost});
        });
    
});

router.get("/post/:id",ensureAuthenticated,function(request,response){
    const search=request.params.id;
    post.findOne({_id: search},function(err,finditem){
       response.render("posts",{title: finditem.title,postBody: finditem.postBody,picname: finditem.picname});
    });
});




router.get('/store',function(req,res){
    res.render('store');
})
router.get('/contribute',function(req,res){
    res.render('contribute');
})
module.exports = router;