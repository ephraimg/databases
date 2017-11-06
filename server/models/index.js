var db = require('../db');

module.exports = {
  messages: {
    // a function which produces all the messages
    get: () => {
      return db.Messages.findAll()
        .then(instances => instances.map(instance => instance.get({plain: true})))
        .catch(err => console.error(err)); 
    }, // a function which can be used to insert a message into the database
    post: (message) => {
      console.log('Messages post attempt: ', message);
      return db.Messages.create(message);
    }
  },
  users: {
    // a function which produces all the users
    get: () => {
      return db.Users.findAll()
        .then(instances => instances.map(instance => instance.get({plain: true})))
        .catch(err => console.error(err)); 
    }, // a function which can be used to insert a user into the database
    post: (username) => {
      console.log('Users post attempt: ', username);      
      return db.Users.findOrCreate({where: {username: username}})
        .catch(err => console.error(err));
    }
  }
}; 
