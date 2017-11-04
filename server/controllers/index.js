var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get()
        .then(results => res.send({results: results}))
        .catch(err => console.error(err));   
    }, 
    post: function (req, res) {
      // a function which handles posting a message to the database
      // make sure the user is in the db
      models.users.post(req.body.username)
      // send js message object to db function
      models.messages.post(req.body)
        .then(results => {
          req.body.insertId = results.insertId;
          res.send(201, req.body);
        })
        .catch(err => console.error(err));
      });
    } 
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // send res with json { results: [messages....] }      
    },
    post: function (req, res) {
      return models.users.post(username)
        .then(results => res.send(201, results);
    }
  }
};

