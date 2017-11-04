var db = require('../db');

module.exports = {
  messages: {
    get: function () {
      db.conn.query('select * from `messages`', function(err, results, fields) {
        if (err) { console.error(err); }
        console.log('Results:\n', results);
      });
    }, // a function which produces all the messages
    post: function () {
      db.conn.query("insert into messages (messageText, id_users, id_rooms) values ('Another message from Steve...', 1, 1)",
        function(err, results, fields) {
          if (err) { console.error(err); }
          console.log('Successfully inserted message!'); 
        });
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function () {},
    post: function () {}
  }
};

console.log('Attempting to get mysql messages...\n');
module.exports.messages.post();
module.exports.messages.post();
module.exports.messages.post();
module.exports.messages.post();
console.log('Attempting to get mysql messages...\n');
module.exports.messages.get();

// messages = { {user: 'e', text: 'hi'}, ... }
// messages[1]

// messages.get(1);