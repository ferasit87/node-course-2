var env = process.env.NODE_ENV || 'devlopment';

if (env === 'devlopment'){
  process.env.PORT = 3000;
  process.env.MONGODB_URI  =  'mongodb://localhost:27017/Todos' ;
}else if (env === 'test') {
  process.env.PORT = 3000;
  process.env.MONGODB_URI  =  'mongodb://localhost:27017/TodosTest' ;
}
