var models = require('../models');

module.exports = {
  messages: {
    // a function which handles a get request for all messages
    get: function (req, res) {
      models.messages.get()
        .then(results => res.send({results: results}))
        .catch(err => console.error(err));   
    }, 
    // a function which handles posting a message to the database
    post: function (req, res) {
      // make sure the user is in the db
      models.users.post(req.body.username)
        // send message object to db function
        .then(() => models.messages.post(req.body))
        .then(results => {
          // req.body.insertId = results.insertId;
          res.send(201, req.body);
        })
        .catch(err => res.send(404, 'Server: Unable to post.\nError: ', err));
    } 
  },

  users: {
    // a function which handles a get request for all users
    get: function (req, res) {
      models.users.get()
        .then(results => res.send({results: results}))
        .catch(err => console.error(err));// send res with json {}      
    },
    // a function which handles posting a new user to the user database
    post: function (req, res) {
      return models.users.post(req.body.username)
        .then(results => res.send(201, results))
        .catch(err => res.send(404, 'Server: Unable to post.\nError: ', err));
    }
  }
};

