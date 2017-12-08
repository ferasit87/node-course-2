const expect = require('expect');
const request = require('supertest');
const {ObjectID} = require('mongodb');
const  {app} = require('./../server');
const  {Todo} = require('./../models/todo');

const todos = [{
  _id : new ObjectID(),
  text : 'First test todo'
},{
  _id : new ObjectID(),
  text : 'Second test todo ',
  completed: true,
  completedAt: 333
}]
beforeEach((done) =>{
  Todo.remove({}).then(()=> {
      return Todo.insertMany(todos)
  }).then(()=> done());
});

describe("POST /todos", () => {

  it('Sould create to do' , (done)=>{
    var text = 'Testing!!1';

    request(app)
    .post('/todos')
    .send({  text  })
    .expect(200)
    .expect((res)=>{
      expect(res.body.text).toBe(text);
    })
    .end((err, res) =>{
      if (err){
        return done(err);
      }
      Todo.find({text}).then((todos) => {
        expect(todos.length).toBe(1);
        expect(todos[0].text).toBe(text);
        done();
      }).catch((e)=> done(e));
    });

  });

  it('Sould be empty',(done) => {

    var text = '';
    request(app)
    .post('/todos')
    .send({})
    .expect(400)
    .end((err, res) => {

        if (err){ return done(err)}
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done()
        }).catch((e)=> done(e));
    });
  })

})

describe ('GET /todos ', ()=>{
    it('Should return todos',(done)=>{
      request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done);
    })
})
describe ('GET /todos/:id ', ()=>{
    it('Should return 404',(done)=>{
      request(app)
      .get('/todos/7985794')
      .expect(404)
      .end(done);
    });

    it('Should return 404',(done)=>{
      var id = new ObjectID() ;
      request(app)
      .get(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
    });

    it('Should return todo doc',(done)=>{
      request(app)
      .get(`/todos/${todos[0]._id.toHexString() }`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(todos[0].text);
      })
      .end(done);
    });
})


describe ('DELETE /todos/:id ', ()=>{
    it('Should return 404',(done)=>{
      request(app)
      .delete('/todos/7985794')
      .expect(404)
      .end(done);
    });

    it('Should return 404',(done)=>{
      var id = new ObjectID() ;
      request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
    });

    it('Should return todo doc',(done)=>{
      request(app)
      .delete(`/todos/${todos[0]._id.toHexString() }`)
      .expect(200)
      .expect((res) => {
        console.log(res.body.todo);
        expect(res.body.todo.text).toBe(todos[0].text);
      }) ;

      Todo.findById(todos[0]._id.toHexString()).then((todo) =>{
        console.log(todo);
        expect(todo).toExist();
        done();
      }).catch((e) => done(e))

    });


})


describe ('update /todos/:id ', ()=>{
    it('Should return 404',(done)=>{
      request(app)
      .delete('/todos/7985794')
      .expect(404)
      .end(done);
    });

    it('Should return 404',(done)=>{
      var id = new ObjectID() ;
      request(app)
      .delete(`/todos/${id.toHexString()}`)
      .expect(404)
      .end(done);
    });

    it('Should return todo doc',(done)=>{
      var body = {text : "Changed to do" , complete : true}
      request(app)
      .patch(`/todos/${todos[0]._id.toHexString() }`)
      .send(body)
      .expect(200)
      .expect((res) => {
        console.log(res.body.todo);
        expect(res.body.todo.text).toBe(body.text);
        expect(res.body.todo.complete).toBe(true);
        expect(res.body.todo.completeAt).not.toBeNull();
        done();
      }).catch((e) => done(e)) ;


    });


})
