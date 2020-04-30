const mongoose = require('mongoose');

//ES6 Promises
mongoose.Promise = global.Promise; //we are using ES6 promises instead of mongoose default promises to remove the "Deprication warning".

//connect to the database before running tests...use "before"
before(function(done){

//connect to mongodb
mongoose.set('useUnifiedTopology', true);//to remove the "Deprication warning" ..we need to add this to MongoClient Constructor.
mongoose.connect('mongodb://localhost/blog',{ useNewUrlParser: true}); //localhost: it connects it locally
//testabroo is  a database if it is already created it will connect mongoose or it will create a new database

mongoose.connection.once('open',function(){//.once means listen to this event once......once the connection is open we call the function
          console.log('Connection has been made,now make fireworks..');
          done();

}).on('error',function(error){//.on means listen to the event every time
    console.log('Connection error:',error);
});

});

//Drop the characters collection before each test
beforeEach(function(done){
  //drop the colletion
  mongoose.connection.collections.mariochars.drop(function(){
    done();
  });
});//beforeEach is used to run the function before every test.
