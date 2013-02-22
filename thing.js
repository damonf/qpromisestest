var thing = {
  doStuff: function(fail, callback) {

    console.log('doStuff called');

    var doit = function() {
      if (fail === true) {
        callback(new Error('doStuff failed'), null);
      } else {
        callback(null, 'doStuff success'); 
      }
    };

    setTimeout(doit, 500);
  },
  doMoreStuff: function(fail, callback) {

    console.log('doMoreStuff called');

    var doit = function() {
      if (fail === true) {
        callback(new Error('doMoreStuff failed'), null);
      } else {
        callback(null, 'doMoreStuff success'); 
      }
    };

    setTimeout(doit, 500);
  },
  doEvenMoreStuff: function(fail, callback) {

    console.log('doEvenMoreStuff called');

    var doit = function() {
      if (fail === true) {
        callback(new Error('doEvenMoreStuff failed'), null);
      } else {
        callback(null, 'doEvenMoreStuff success'); 
      }
    };

    setTimeout(doit, 500);
  }
};

exports.thing = thing;
