var Sequelize = require('sequelize');
var db = new Sequelize('chat', 'root', '');

var Users = db.define('Users', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  },
  // Default values below are needed to pass tests.
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }
}); 

var Messages = db.define('Messages', {
  username: Sequelize.STRING,
  text: Sequelize.STRING,
  roomname: Sequelize.STRING,
  // Default values below are needed to pass tests.  
  createdAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  },
  updatedAt: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.literal('NOW()')
  }  
});

Users.sync()
  // Now instantiate an object and save it:
  .then(() => Users.findOrCreate({username: 'Chatterbot'}))
  // Retrieve objects from the database:
  .then(() => Users.findAll())
  // Log all existing users (don't forget, this return *instances*)
  .then(function(users) {
    console.log(`----------------------\n Initialized the Users table...`);
    users.forEach(function(user) {
      console.log('Username "' + user.username + '" exists');
    });
  })
  // Handle any error in the chain
  .catch(err => console.error(err));

Messages.sync()
  .then(function() {
    // Insert an initial message or the client will break!
    return Messages.findOrCreate({where: {
      username: 'Chatterbot',
      text: 'Welcome to Chatterbox!',
      roomname: 'lobby'
    }}); 
  }) 
  // Retrieve objects from the database:
  .then(() => Messages.findAll())
  .then(function(messages) {
    var newMessages = messages.map(message => {
      return message.get({plain: true});
    });
    console.log(`----------------------\n Initialized the Messages table...`);
    newMessages.forEach(function(message) {
      console.log('A message was posted: \n', message);
    });
  })
  .catch(err => console.error(err));
 

module.exports.db = db;
module.exports.Users = Users;
module.exports.Messages = Messages;
