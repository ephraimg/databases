var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: () => db.conn.queryAsync('select * from `messages`'),
    post: (message) => {
      var mysqlObj = {
        "text": message.text,
        "username": message.username,
        "roomname": message.roomname
      };
      // a function which can be used to insert a message into the database
      return db.conn.queryAsync("insert into messages set ?", mysqlObj);
    }
  },

  users: {
    // a function which produces all the users
    get: () => db.conn.queryAsync('select * from `users`'),
    // a function which can be used to insert a message into the database
    post: (username) => {
      return db.conn.queryAsync("insert into users set ?", {"username": username});
    }
  }
}; 

// console.log('Attempting to get mysql messages...\n');
// module.exports.messages.post();
// // module.exports.messages.post();
// // module.exports.messages.post();
// // module.exports.messages.post();
// console.log('Attempting to get mysql messages...\n');
// module.exports.messages.get();

// messages = { {user: 'e', text: 'hi'}, ... }
// messages[1]

// messages.get(1);