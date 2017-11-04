var mysql = require('mysql');
var Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);
Promise.promisifyAll(require("mysql/lib/Pool").prototype);

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host : 'localhost',
  user : 'student',
  password : 'student',
  database : 'chat'
});

connection.connectAsync()
  .then(results => {
    console.log('connected! ' + connection.threadId);
  })
  .catch(err => {
    console.error('error connecting: ' + err.stack);
  });

exports.conn = connection;