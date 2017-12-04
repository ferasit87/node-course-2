const express = require('express');
const bodyParser = require('body-parser');
var {mongoose} = require('./db/mongoose.js');
var {Todo} =  require('./models/todo.js');
var {User} =  require('./models/user.js');
var {ObjectID} = require('mongodb');
var app = express();
const posr = process.env.PORT || 3000 ;
app.use(bodyParser.json());

app.post('/todos' , (req, res) =>{
  var todo = new Todo({
   text: req.body.text
   });
  todo.save().then((doc)=>{
    res.send(doc);
  },(e) =>{
      res.status(400).send(e);
  })
});

app.get('/todos' , (req, res) =>{

    Todo.find().then((todos) =>{
      res.send({todos});
    } , (e) => {
      res.status(400).send(e);
    console.log("Error saving",e);
  });
});

// GET /todos/1235
app.get('/todos/:id', (req, res)=>{
    var id  = req.params.id ;
    if (!ObjectID.isValid(id)){
      return res.status(404).send()
    }
    Todo.findById(id).then((doc)=>{
      if (!doc){
        return res.status(404).send();
      }
      res.send({todo:doc});
    }).catch((e)=>{
      res.status(400).send();
    });
  });


app.listen(port,()=>{
  console.log(`Started up on ${port}`);
});

module.exports = {app};
