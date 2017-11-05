var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: () => {
      return db.Message.findAll();
    },
    post: (message) => {
      // var mysqlObj = {
      //   "text": message.text,
      //   "username": message.username,
      //   "roomname": message.roomname
      // };
      // a function which can be used to insert a message into the database
      return db.Message.create(message);
    }
  },

  users: {
    // a function which produces all the users
    get: () => {
      return db.User.findAll();
    }, // a function which can be used to insert a message into the database
    post: (username) => {
      return db.User.create({username: username});
    }
  }
}; 
