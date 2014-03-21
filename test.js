'use strict';

var sideSubj;

function compare(__, __es5, name, args) {
  var r = {};

  sideSubj = _.clone(args[0]);
  r.__ret = __[name].apply(__, _.clone(args));
  r.__sideSubj = JSON.stringify(sideSubj);
  sideSubj = _.clone(args[0]);
  r.__es5ret = __es5[name].apply(__es5, _.clone(args));
  r.__es5sideSubj = JSON.stringify(sideSubj);

  r.res = JSON.stringify(r.__ret) === JSON.stringify(r.__es5ret) && r.__sideSubj === r.__es5sideSubj;

  return r;
}

var tests = {
  'map array': [
    [1, 2, 3],
    function(x) {
      return x + 1;
    }
  ],
  'map object': [
    {a: 1, b: 2, c: 3},
    function(x) {
      return x + 1;
    }
  ],
  'each object': [
    {a: 1, b: 2, c: 3},
    function(val, key) {
      return sideSubj[key] = val + 1;
    }
  ],
  'each array': [
    [1, 2, 3],
    function(val, i) {
      sideSubj[i] = val + 1;
    }
  ],
  'reduce array': [
    [1, 2, 3],
    function(a, b) {
      return a + b;
    }
  ],
  'reduce array+init': [
    [1, 2, 3],
    function(a, b) {
      return a + b;
    },
    5
  ],
  'reduce object': [
    {a: 1, b: 2, c: 3},
    function(a, b) {
      return a + b;
    },
    5
  ],
  'reduce object+context': [
    {a: 1, b: 2, c: 3},
    function(a, b) {
      return a + b;
    },
    5,
    {}
  ],
  'reduceRight object': [
    {a: [1], b: [3, 4], c: [5, 6]},
    function(a, b) {
      return a.concat(b);
    }
  ],
  'find object': [
    {a: 1, b: 2, c: 3},
    function(x) {
      return x === 3;
    }
  ],
  'find array': [
    [1, 2, 3],
    function(x) {
      return x === 2;
    }
  ],
  'filter array': [
    [1, 2, 3],
    function(x) {
      return x > 1;
    }
  ],
  'filter object': [
    {a: 1, b: 2, c: 3},
    function(x) {
      return x > 1;
    }
  ],
  'where array': [
    [{a: 1, b: 2}, {a: 3, b: 2}],
    {a: 1, b: 2}
  ],
  'where object': [
    {a: {a: 1, b: 2, c: 3}, b: {a: 2, b: 3, c: 4}, c: {a: 1, b: 2, c: 5}},
    {a: 1, b: 2}
  ],
  'findWhere array': [
    [{a: 6, b: 7}, {a: 1, b: 2, c: 3}, {a: 3, b: 2}],
    {a: 1, b: 2}
  ],
  'findWhere array+notfound': [
    [{a: 6, b: 7}, {a: 1, b: 2, c: 3}, {a: 3, b: 2}],
    {a: 1, b: 5}
  ],
  'reject array': [
    [0, 1, 2, 3],
    function(x) {
      return x < 2;
    }
  ],
  'every array': [
    [0, 1, 2, 3],
    function(x) {
      return x < 2;
    }
  ],
  'some array': [
    [0, 1, 2, 3],
    function(x) {
      return x < 2;
    }
  ],
  'some object': [
    {a: 1, b: 2, c: 3},
    function(x) {
      return x > 2;
    }
  ],
  'contains array': [
    [0, 1, 2, 3],
    2
  ],
  'invoke array': [
    [{
        aaa: function() {
          sideSubj.push(arguments);
          return 1;
        }
      },
      {
        aaa: function() {
          sideSubj.push(arguments);
          return 2;
        }
      }
    ],
    'aaa',
    5,
    5
  ],
  'pluck array': [
    [{a: 6, b: 7}, {a: 1, b: 2, c: 3}, {a: 3, b: 2}],
    'a'
  ],
  'max array': [
    [1, 2, 3, 4, 5, 6, 2, 3]
  ],
  'max array+iterator': [
    [1, 2, 3, 4, 5, 6, 2, 3],
    function(x) {
      return x + 5;
    },
    {q: 5}
  ],
  'max array+nonnumeric': [
    ['q', 2, 3, 4, 'pp', 2, 'x']
  ],
  'min array+nonnumeric': [
    ['q', 2, 3, 4, 'pp', 2, 'x']
  ]

};

Object.keys(tests).forEach(function(key) {
  var args = tests[key];
  var name = key.split(' ')[0];
  var r = compare(_, _es5, name, args);
  if (!r.res) {
    delete r.res;
    console.error(key, '    ', r.__ret, r.__es5ret, '    ', r.__sideSubj, r.__es5sideSubj);
  }
});


function gets(fn, t) {
  t = t || 1000;
  var now = Date.now();
  var c = 0;
  while(true) {
    fn();
    c += 1;
    if (Date.now() > now + t) {
      return Math.round(c / t);
    }
  }
}

function st(key) {
  var q = key ? {} : tests;
  if (key) {
    q[key] = tests[key];
  }
  Object.keys(q).forEach(function(key) {
    var name = key.split(' ')[0];
    var args = tests[key];
    sideSubj = _.clone(args);
    var _r = gets(function() { _[name].apply(_, args); });
    sideSubj = _.clone(args);
    var _esrr = gets(function() { _es5[name].apply(_es5, args); });
    console.log(key, ',', _esrr, ',', Math.round(_esrr / _r * 100) / 100);
  });
}
