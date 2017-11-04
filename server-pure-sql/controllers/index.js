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
      console.log('controller message post req.body: ', req.body);
      models.users.post(req.body.username)
        .then((results) => {
          console.log('controller message post results: ', results);
          // send js message object to db function
          return models.messages.post(req.body);
        })
        .then(results => {
          req.body.insertId = results.insertId;
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
    post: function (req, res) {
      // a function which handles posting a new user to the user database
      console.log('server users post req.body: ', req.body);
      return models.users.post(req.body.username)
        .then(results => res.send(201, results))
        .catch(err => res.send(404, err));
    }
  }
};

