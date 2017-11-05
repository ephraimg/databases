var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'student', 'student');

var User = db.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

var Message = db.define('Message', {
  username: Sequelize.STRING,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING
});

User.sync()
  .then(function() {
    // Now instantiate an object and save it:
    return User.create({username: 'Jean Valjean'});
    return sequelize.query("insert ignore into users set ?", { replacements: [{"username": username}], type: sequelize.QueryTypes.SELECT });
  })
  .then(function() {
    // Retrieve objects from the database:
    return User.findAll({ where: {username: 'Jean Valjean'} });
  })
  .then(function(users) {
    users.forEach(function(user) {
      console.log(user.username + ' exists');
    });
    // db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    // db.close();
  });

Message.sync()
  .then(function() {
    return Message.create({
      username: 'Fred',
      text: 'Hello, everyone!',
      roomname: 'lobby'
    }); 
  })
  .then(function() {
    // Retrieve objects from the database:
    return Message.findAll();
  })
  .then(function(messages) {
    var newmessages = messages.map(message => {
      return message.get({plain:true});
    });
    newmessages.forEach(function(message) {
      // return message.get({plain:true});
      console.log('A message was posted: ', message);
    });
    // db.close();
  })
  .catch(function(err) {
    // Handle any error in the chain
    console.error(err);
    // db.close();
  }); 

module.exports.db = db;
module.exports.User = User;
module.exports.Message = Message;

/*    // PURE SQL CODE
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
*/