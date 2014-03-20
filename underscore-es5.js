'use strict';

var _es5 = {};

// collection functions
Object.assign(_es5, {
  each: function(x, callback, thisArg) {
    if (!Array.isArray(x)) {
      Object.keys(x).forEach(function(key) {
        callback.call(thisArg, x[key], key);
      });

      return x;
    }

    x.forEach.call(x, callback, thisArg);
    
    return x;
  },
  map: function(x, callback, thisArg) {
    if (!Array.isArray(x)) {
      x = Object.keys(x).map(function(key) {
        return x[key];
      });
    }

    return x.map(callback, thisArg);
  },
  reduce: function(x, callback, init, context) {
    if (!Array.isArray(x)) {
      x = Object.keys(x).map(function(key) {
        return x[key];
      });
    }

    var args = [];

    if (context) {
      args.push(callback.bind(context));
    } else {
      args.push(callback);
    }
    if (init) {
      args.push(init);
    }

    return Array.prototype.reduce.apply(x, args);
  }
});
