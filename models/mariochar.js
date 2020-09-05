const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//create Schema and model


const SubscriberSchema = new Schema({
  subscriber: {
    type : String,
  }
})
const Subscriber=mongoose.model("Subscriber",SubscriberSchema);
const MarioCharSchema = new Schema({
  username: {
      type:String,
      required:true
  },
  email: {
    type:String,
    required:true
  },  
  password: {
    type:String,
    required:true
   },  
   radio:{
     type:String,
     required:true
   },
   
  date: {
    type:Date,
    default:Date.now
  },  
  subscriber: [SubscriberSchema]
  
});






const MarioChar = mongoose.model('mariochar',MarioCharSchema);
 //this tells that "mariochar" is a colletion, "MarioChar" is the model and schema of the model is MarioCharSchema.

 module.exports = {MarioChar,Subscriber}; //so that we can use this in all the files in this project