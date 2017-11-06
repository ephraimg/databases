/* You'll need to have MySQL running and your Node server running
 * for these tests to pass. */

var mysql = require('mysql');
var request = require('request'); // You might need to npm install the request module!
var expect = require('chai').expect;

describe('Persistent Node Chat Server', function() {
  var dbConnection;

  beforeEach(function(done) {
    dbConnection = mysql.createConnection({
      user: 'root',
      password: '',
      database: 'chat'
    });
    dbConnection.connect();

    var tablename = 'Messages'; // TODO: fill this out
    var tablename2 = 'Users';

    /* Empty the db table before each test so that multiple tests
     * (or repeated runs of the tests) won't screw each other up: */
    dbConnection.query('truncate ' + tablename);
    dbConnection.query('truncate ' + tablename2, done);
  });

  afterEach(function() {
    dbConnection.end();
  });

  it('Should insert posted messages to the DB', function(done) {
    // Post the user to the chat server.
    request({
      method: 'POST',
      uri: 'http://127.0.0.1:3000/classes/users',
      json: { username: 'Valjean' }
    }, function () {
    // Post a message to the node chat server:
      request({
        method: 'POST',
        uri: 'http://127.0.0.1:3000/classes/messages',
        json: {
          username: 'Valjean',
          text: 'In mercy\'s name, three days is all I need.',
          roomname: 'Hello'
        }
      }, function (err, response, body) {
        // Now the message should be in the database.
        // TODO: You might have to change this test to get all the data from
        // your message table, since this is schema-dependent.
        var queryString = 'SELECT * FROM Messages';
        dbConnection.query(queryString, [], function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);
          // TODO: If you don't have a column named text, change this test.
          expect(results[0].text).to.equal('In mercy\'s name, three days is all I need.');
          done();
        });
      });
    });
  });

  it('Should not allow username duplicates', function(done) {
    // Let's insert a user into the db
    var queryString = 'insert ignore into users set ?';
    var queryArgs = [{"username": 'testUser'}];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }
      dbConnection.query(queryString, queryArgs, function(err2) { 
        if (err2) { throw err2; }
        // Now query the Node chat server and see if it returns
        // the message we just inserted:
        dbConnection.query('select * from users where username = "testUser"', [], function(err, results) {
          // Should have one result:
          expect(results.length).to.equal(1);
          // TODO: If you don't have a column named text, change this test.
          expect(results[0].username).to.equal('testUser');
          done();
        });
      });
    });
  });

  it('Should provide the client all messages from the DB', function(done) {
    // Let's insert a message into the db
    var queryString = 'INSERT INTO messages (username, text, roomname)\
      values ("Valjean", "Men like you can never change!", "main")';
    var queryArgs = [];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/messages', function(error, response, body) {
        var messageLog = JSON.parse(body).results;
        expect(messageLog[0].text).to.equal('Men like you can never change!');
        expect(messageLog[0].roomname).to.equal('main');
        done();
      });
    });
  });

  it('Should provide the client all users from the DB', function(done) {
    // Let's insert a user into the db
    var randomUser = 'testUser';
    var queryString = 'insert into users set ?';
    var queryArgs = [{'username': 'testUser'}];
    // TODO - The exact query string and query args to use
    // here depend on the schema you design, so I'll leave
    // them up to you. */

    dbConnection.query(queryString, queryArgs, function(err) {
      if (err) { throw err; }

      // Now query the Node chat server and see if it returns
      // the message we just inserted:
      request('http://127.0.0.1:3000/classes/users', function(error, response, body) {
        var messageLog = JSON.parse(body).results;
        
        // Why do I need this line?? Messages gets cleared out automatically, but not Users...
        dbConnection.query('delete from users where username = "testUser"', [], ()=>{});
        expect(messageLog[0].username).to.equal(randomUser);
        done();
      });
    });
  });

});
