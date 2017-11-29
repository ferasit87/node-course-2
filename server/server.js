const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose.js');
var {Todo} =  require('./models/todo.js');
var {User} =  require('./models/user.js');

var app = express();

app.use(bodyParser.json());

app.post('/todos' , (req, res) =>{
  var todo = new Todo({
   text: req.body.text
   });
  todo.save().then((doc)=>{
    res.send(doc);
    console.log("Saved", doc );
  },(e) =>{
      res.status(400).send(e);
    console.log("Error saving",e);
  })
});

app.listen(3000,()=>{
  console.log("started on 3000");
});

module.exports = {app};
