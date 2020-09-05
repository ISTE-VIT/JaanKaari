const mongoose= require('mongoose')


const postsSchema =new mongoose.Schema({
    
    title : {
        type : String,
        required : true,
        
    },
    
    postBody: {
            type:String,
            required:true,
            
    },
    update:{
        type:String,
        
    },
   
    picname:{
        type:String,
        
    },
    authorid:{
        type:String,
    
    },
    authorname:{
        type:String,
    
    },
    authorEmail:{
        type:String,
    },

})


  module.exports = mongoose.model('post', postsSchema)
