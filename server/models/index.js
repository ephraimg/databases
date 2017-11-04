var db = require('../db');

module.exports = {
  messages: {
    get: function (callback) {
      db.conn.query('select * from `messages`', callback);
    }, // a function which produces all the messages
    post: function (message, callback) {
      var mysqlObj = {
        "text": message.text,
        "username": message.username,
        "roomname": message.roomname
      };
      db.conn.query("insert into messages set ?", mysqlObj, callback);
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
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