//const mongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  console.log("Connecting ...");
  if (err) {
    return console.log("Faild to connect to mongo DB server");
  }
  console.log('Connected to MongoDB server');


  /*db.collection('Todos').find({
      _id : new ObjectID('5a1c0248b7af7a394aa4a667')
  }).toArray().then((docs) => {

      console.log('Todos');
      console.log(JSON.stringify(docs, undefined, 2));

  }, (err) => {
      console.log("Unable to featch" , err)
  });*/
  /*  db.collection('Todos').find({ }).count().then((count) => {

     console.log('Todos count');
     console.log(count);

     }, (err) => {
     console.log("Unable to featch" , err)
     });*/
    db.collection('User').find({
        age : 22
    }).toArray().then((docs)=>{
        console.log(JSON.stringify(docs, undefined, 2));

    },(err)=>{
        console.log("Unable to featch" , err)
    })

 // db.close();

});
