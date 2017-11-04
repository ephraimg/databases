var mysql = require('mysql');

// Create a database connection and export it from this file.
// You will need to connect with the user "root", no password,
// and to the database "chat".

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'student',
  password : 'student',
  database : 'chat'
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected! ' + connection.threadId);
});

// connection.query('describe messages', function(error, results, fields) {
//   if (error) { console.error(error); }
//   console.log('The messages table looks like this:\n', results);
// });

exports.conn = connection;