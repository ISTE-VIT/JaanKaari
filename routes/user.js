const express = require('express');
const router = express.Router();
const post = require('../models/posts');
const author = require('../models/mariochar');
const { ensureAuthenticated } = require('../config/auth');


router.use('/',express.static("./public"));
router.use('/',express.static(__dirname+"/roots"));
router.get('/dashboard',function(req,res){
    res.render('homedash',{user:req.user});
})


router.get('/:id/account',function(req,res){
    const authora=req.params.id;
    author.MarioChar.findOne({_id: authora},function(err,finditem){
      post.find({authorid: authora},function(err,finditem1){
       res.render("docuser",{docname:finditem.username,post:finditem1});
    });
  });
})


router.get("/post/:id",ensureAuthenticated,function(request,response){
    const search=request.params.id;
    post.findOne({_id: search},function(err,finditem){
       response.render("viewpost",{title: finditem.title,postBody: finditem.postBody,picname: finditem.picname,author:finditem.authorname,mail:finditem.authorEmail});
    });
});

router.get("/blog",function(request,response){
    post.find({},function(err,foundtpost){

            if(err)
            console.log(err);
            else
            response.render("bloguser",{post: foundtpost});
        });

});




router.get('/store',function(req,res){
    res.render('store');
})
router.get('/contribute',function(req,res){
    res.render('contribute');
})
module.exports = router;
