require('./config/config');
const _ =  require('lodash') ;
const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
//const passwordHash  = require('password-hash ');
var {mongoose} = require('./db/mongoose.js');
var {Todo} =  require('./models/todo.js');
var {User} =  require('./models/user.js');
var {authenticate} =  require('./middleware/authenticate.js');


var app = express();
const port = process.env.PORT  ;
app.use(bodyParser.json());
// Todos REQUESTS
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

  app.get('/', (req, res)=>{
      res.send('Working')
    });

  app.delete('/todos/:id', (req, res)=>{
    var id  = req.params.id ;
    if (!ObjectID.isValid(id)){
      return res.status(404).send()
    }
    Todo.findByIdAndRemove(id).then((doc)=>{
      if (!doc){
        return res.status(404).send();
      }
      res.send({todo:doc});
    }).catch((e)=>{
      res.status(400).send();
    });

  });

app.patch('/todos/:id', ((req,res) => {

  var id = req.params.id ;
  var body = _.pick(req.body, ['text' , 'completed']);
  if (!ObjectID.isValid(id)){
    return res.status(404).send();
  }
  body.completed = Boolean(body.completed);
  console.log(_.isBoolean(body.completed));
  if (_.isBoolean(body.completed) && body.completed){
    body.completedAt = new Date().getTime();
  }else {
    body.completed = false ;
    body.completedAt = null ;
  }

  Todo.findByIdAndUpdate(id, {$set : body}, {new: true}).then((todo)=>{
    if (!todo){
      return res.status(404).send('doenst find todo');
    }
    res.send({todo});
  }).catch((e) =>{
    res.status(400).send(e);
  })
}));


// Users REQUESTS


app.get('/users/me', authenticate,(req, res ) =>{
  res.send(req.user);
});
app.post('/users', (req, res) => {
  var user = new User({
   email: req.body.email,
   password : req.body.password
   });
   user.save().then(() => {
     return user.generateAuthToken();
   }).then((token) => {
     res.header('x-auth', token).send(user);
   }).catch((e) => {
     res.status(400).send(e);
   })

});

app.listen(port,()=>{
  console.log(`Started up on ${port}`);
});


module.exports = {app};
