
var q = require('q');
var thing = require('./thing').thing;

// construct a dynamic sequence
function dynamicSequence() {
  console.log('Dynamic Sequence');

  var result = q.resolve(q.ninvoke(thing, 'doStuff', false));
  
  console.log('setup steps');

  var step1 = {
    dostep: function(result) {
      console.log('first result: ' + result);
      return q.ninvoke(thing, 'doMoreStuff', false);
    },
    handleError: function(err) {
      var msg = 'first err: ' + (err.message || err);
      console.log(msg);
      throw new Error(msg);
    }
  };
  
  var step2 = {
    dostep: function(result) {
      console.log('second result: ' + result);
      return q.ninvoke(thing, 'doEvenMoreStuff', false);
    },
    handleError: function(err) {
      var msg = 'second err: ' + (err.message || err);
      console.log(msg);
      throw new Error(msg);
    }
  };
  
  var todos = [step1, step2];
  
  console.log('start...');

  todos.forEach(function(todo) {
    result = result.then(todo.dostep, todo.handleError);
  });
  
  result.then(function(result) {
      console.log('final result: ' + result);
    },
    function(err) {
      var msg = 'final err: ' + (err.message || err);
      console.log(msg);
      //throw new Error(msg); // this error will be lost without the .done()
  })
  .done(); // rethrows any final error
}

exports.dynamicSequence = dynamicSequence;

