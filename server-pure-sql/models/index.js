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
      console.log('models users post username: ', username);
      return db.conn.queryAsync("insert ignore into users set ?", {"username": username});
    }
  }
}; 
