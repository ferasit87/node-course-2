const {SHA256} = require('crypto-js');

const jwt = require('jsonwebtoken');

var data = {
  id  : 10
};
console.log(data);
var token = jwt.sign(data, '123abc') ;
console.log(token);
var decode = jwt.verify(token, '123abc');
console.log(decode);
//
// var message = 'I am user number 3' ;
// var has = SHA256(message).toString();
//
// console.log(has);
//
//
// var data = {
//   id  : 4
// };
//
// var token = {
//   data,
//   hash : SHA256(JSON.stringify(data) + 'somesecret' ).toString()
// }
//
// var result = SHA256(JSON.stringify(token.data) + 'somesecret' ).toString()
//
// if (result === token.hash) {
//   console.log("DATA OK");
// }else {
//   console.log("DATA CHANGED");
// }
