const mocha = require('mocha');
const assert = require('assert');
const MarioChar = require('../models/mariochar');
const post = require('../models/posts')

//describe tests
describe('Saving records',function(){
  
//create tests
it('saves a record to a database',function(done){

    const newpost=new post({
        title: 'he',
        postBody: 'h',
        update:  '24/04/2032',
        picname: 'def.png',
         authorid: '25423642',
         authorname:'ewgwergt'
        
    });
    // newpost.save(function(err){
    //     if(!err)
    //     {
    //     res.redirect(`./account`);
    //     }   else{
    //         console.log(err)
    //         };
        
    //  });  

    newpost.save().then(function(){
    assert(newpost.isNew === false);//this means it is not new and it is saved to our database.
    done();

    })
    .catch((err)=>{
  console.log(err)
    });     //for saving the recored to our collection in database.
    //we cant directly right assert()..after char.save()..bcoz save is a asynchronous request(means it is not instant..it takes some time)
    //if we do this it runs assert before saving our data.....thats why we use ".then"...which means it works only after it is saved to the database.

});//each "it" block describe one single test

});
