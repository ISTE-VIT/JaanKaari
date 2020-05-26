const express = require('express');
const router = express.Router();
const post = require('../models/posts')
const MarioChar = require('../models/mariochar');
const { ensureAuthenticated } = require('../config/auth');


router.use('/',express.static(__dirname+"/roots"))
// router.get('/dashboard',function(req,res){
//     res.render('dashboard',{user:req.user});
// })
router.get(`/dashboard`,async function(req,res){
    
    // let user = await MarioChar.findById(req.params.id)
   
    res.render('homedash',{user:req.user});
})


router.get('/store',function(req,res){
    res.render('store');
})
router.get('/contribute',function(req,res){
    res.render('contribute');
})


module.exports = router;