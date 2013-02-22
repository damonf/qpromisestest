var q = require('q');
var thing = require('./thing').thing;

// do stuff in parallel
function parallel() {
  console.log('parallel');

  var todos = [ q.nfcall(thing.doStuff, false), q.nfcall(thing.doMoreStuff, false) ];
  q.all(todos)
  .then(function () {
    console.log('DONE both things');
  },
  function (err) {
    console.log('error doing both things: ' + (err.message || err));
  });
}

exports.parallel = parallel;
