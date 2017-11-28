//const mongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err, db) => {
  console.log("Connecting ...");
  if (err) {
    return console.log("Faild to connect to mongo DB server");
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').insertOne({
  //   text : 'Somthing to do ',
  //   completed: false
  // },(err, result)=>{
  //
  //   if (err) {
  //     return console.log("Cannot to add toDo", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined , 2 ));
  // });
  //
  // db.collection('User').insertOne({
  //   name : 'Feras ',
  //   age: 31 ,
  //   location: 'Syria'
  // },(err, result)=>{
  //
  //   if (err) {
  //     return console.log("Cannot to add toDo", err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined , 2 ));
  // });

  db.close();

});
