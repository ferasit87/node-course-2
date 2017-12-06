const {ObjectID} =  require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

Todo.remve({}).then((res) => {
  console.log(res.result);
});

Todo.findOneAndRemove({}).then((res) =>{
      console.log(res);
});


Todo.findByIdAndRemove('fdsfdsf').then((todo) =>{
      console.log(todo);
});
