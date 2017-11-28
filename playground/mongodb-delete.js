//const mongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  console.log("Connecting ...");
  if (err) {
    return console.log("Faild to connect to mongo DB server");
  }
  console.log("connected  to dB ");

    db.collection('Todos').findOneAndDelete({text: 'walk the dog2'}).then((result) => {
      console.log(result);
    });

 // db.close();


});
