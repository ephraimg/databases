var models = require('../models');

module.exports = {
  messages: {
    get: function (req, res) {
      // use db functions
      models.messages.get(function(err, results, fields) {
        if (err) { console.error(err); }
        res.send({results: results});
      });     
    }, // a function which handles a get request for all messages
    post: function (req, res) {
      console.log('controller post: \n', req.body);
      // send js message object to db function
      models.messages.post(req.body, function(err, results, fields) {
        if (err) { console.error(err); }
        // respond to client with 201
        res.sendStatus(201);
      });
    } // a function which handles posting a message to the database
  },

  users: {
    // Ditto as above
    get: function (req, res) {
      // send res with json { results: [messages....] }      
    },
    post: function (req, res) {
      // parse the json
      // send it to db function
      // respond to client with 201
    }
  }
};

