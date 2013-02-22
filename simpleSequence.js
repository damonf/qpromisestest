
var q = require('q');
var thing = require('./thing').thing;

// Here's a way to add context to errors.
// Note: We have to throw to make the error propagate.
function simpleSequence() {
  console.log('Simple Sequence');

  q.ninvoke(thing, 'doStuff', true)
  .then(function(result) {
      console.log('first result: ' + result);
      return q.ninvoke(thing, 'doMoreStuff', true);
    },
    function(err) {
      var msg = 'first err: ' + (err.message || err);
      console.log(msg);
      throw new Error(msg);
  })
  .then(function(result) {
      console.log('second result: ' + result);
      return q.ninvoke(thing, 'doEvenMoreStuff', false);
    },
    function(err) {
      var msg = 'second err: ' + (err.message || err);
      console.log(msg);
      throw new Error(msg);
  })
  .then(function(result) {
      console.log('final result: ' + result);
    },
    function(err) {
      var msg = 'final err: ' + (err.message || err);
      console.log(msg);
      //throw new Error(msg); // this error will be lost without the .done()
  })
  .done(); // rethrows any final error
}

exports.simpleSequence = simpleSequence;
