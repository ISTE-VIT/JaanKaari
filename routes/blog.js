const express=require("express");
const router=express();
const post = require('../models/posts')
const bodyParser=require("body-parser");
const path = require('path')
const multer = require('multer');
const {MarioChar,Subscriber}=require("../models/mariochar");
var _ = require('lodash');
const { ensureAuthenticated } = require('../config/auth');
const { request } = require("express");




const storage=multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now()+path.extname(file.originalname));
    }
});
const upload= multer({
    storage: storage
}).single('postphoto');


 router.use(bodyParser.urlencoded({extended: true}));

router.use('/',express.static(__dirname+"/roots"));
router.use('/:id',express.static("./public")); 
router.use('/',express.static("./public")); 

router.get("/:id/blog", async (req,res)=>{
    const foundpost=await post.find().sort({update: 'desc'})
    res.render('blog',{post: foundpost})
    
});


router.get("/:id/compose",function(request,response){
    response.render("compose");
});

router.post("/:id/compose",ensureAuthenticated,async(req,res) => {
    var author_id=req.params.id;
    
    await MarioChar.findOne({_id:author_id}).then(user=>{
        var author_name =  user.username
        // console.log(author_name)
    
    console.log(author_id)
    var d = new Date();
    var date = d.getDate();
    var month = d.getMonth() + 1;
    var year = d.getFullYear();
    var dateStr = date + "/" + month + "/" + year;

    upload(req,res, async(err) => {
        if(err){
            res.render("dashboard",{
                msg: err
            });
        }
        else{
             const newpost= new post({
                title: req.body.posttitle,
                postBody: req.body.postbody,
                update:  dateStr,
                picname: req.file.filename,
                 authorid: author_id,
                 authorname:author_name,
                 authorEmail:req.user.email,
                
            });
            newpost.save(function(err){
                if(!err)
                {
                   

                res.redirect(`./account`);
                }   else{
                    console.log(err)
                    };
                
             });  
        }
    });
});
   
    
}); 


 router.get("/:id/post/:postid",function(request,response){
     const search=request.params.postid;
     
     post.findOne({_id: search},function(err,finditem){
        response.render("viewpost",{title: finditem.title,postBody: finditem.postBody,picname: finditem.picname,author:finditem.authorname});
     });
 });
router.post("/:id/delpost",function(request,response){
    const t=request.body.delpost;
    var accountid=request.params.id;
    console.log(t);
    post.deleteOne({title: t},function(err){
        if(err)
        console.log(err);
        else
        {
        console.log("deleted");
        response.redirect(`./account`);
        } 
    });
});

router.post("/:id/updatepost",function(request,response){
    const t=request.body.updatepost;
   console.log(t)
   post.findOne({title: t},function(err,foundpost){
        if(err)
        console.log(err);
        else
        response.render("update",{post:foundpost});
    });

});

router.post("/:id/updatedpost",function(req,res){
    
   var changepicture;

    upload(req,res, (err) => {
        if(err){
            res.render("doc",{
                msg: err
            });
        }
        else{
            const search=req.body.updatepost;
            const changetitle=req.body.posttitle;
            const changebody= req.body.postbody;
            console.log(search);
            console.log(changetitle);
            console.log(changebody);
            if(req.file!==undefined)
            {
                 const changepicture=req.file.filename;
                 
                 post.updateOne({title: search},{title: changetitle,postBody: changebody,picname: changepicture},function(err){
                if(err)
                console.log(err);
                else
                {
                    console.log("updated");
                    res.redirect("./account");
                }
        });

            }
            else
            {
                post.updateOne({title: search},{title: changetitle,postBody: changebody},function(err){
                    if(err)
                    console.log(err);
                    else
                    {
                        console.log("updated");
                        res.redirect("./account");
                    }
            });
            }
           
        }
    });
  
});


router.get("/:id/account",async function(request,response){
    var search=request.params.id;
    var user = request.user
    await MarioChar.findOne({_id:search}).then(user=>{
        var author_name =  user.username
       
        
    post.find({authorname:author_name},function(err,foundtpost){
        
            if(err)
            console.log(err);
            else
            response.render("doc",{post: foundtpost,docname:author_name});
    });   

   
}) ;  
});



//subscribe

// router.post("/:id/post/subscribe",async(req,res) => {
//     var author_id=req.params.postid;
//     var subs_id = req.params.id

    
//     await MarioChar.findOne({_id:author_id}).then(user=>{
       
//         user.subscriber=subs_id

        
//          console.log(subs_id)

//         Mariochar.save(function(err){
//                 if(!err)
//                 {
//                    res.redirect(`./blog`);
//                 }   else{
//                     console.log(err)
//                     };
                
//              });  
        
//     });
    
            
         
// }); 




module.exports = router;

