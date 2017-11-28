//const mongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  console.log("Connecting ...");
  if (err) {
    return console.log("Faild to connect to mongo DB server");
  }
  console.log("connected  to dB ");

    db.collection('Todos').findOneAndUpdate({
    _id : new ObjectID('5a1bf077bd4a081954d69808')
  },{
    $set : {
      complete : true,
      text : "updated"
    }
  }, {
      returnOriginal: false
  }).then((result) => {
      console.log(result);
    });

    db.collection('User').findOneAndUpdate({
    name: 'feras'
  },{
    $inc : {
      age : 1 
    }
  }, {
      returnOriginal: false
  }).then((result) => {
      console.log(result);
    });

 // db.close();


});
