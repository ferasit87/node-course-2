const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {User} = require('./../server/models/user');

 var id = '5a1d5a5877ac65201d4774f7' ;
//
//
// Todo.find({
//   _id: id
// }).then((todos)=>{
//   console.log('Todos =' , todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo)=>{
//   console.log('Todo = ' , todo);
// });
//
// Todo.findById(id).then((todo)=>{
//   if (!todo)  {
//     return console.log("ID not found");
//   }
//   console.log('Todo by id = ' , todo);
// }).catch((e) => console.log(e));

User.findById({
  _id : id
}).then((user)=>{
    if (!user){
      return console.log("Problem with ID");
    }
    console.log("USER :" , JSON.stringify(user, undefined, 2));
}).catch((e)=> console.log(e));
