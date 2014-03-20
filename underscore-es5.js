'use strict';

var _es5 = {};


// Collection

_es5.each = function(list, iterator, context) {
  if (!Array.isArray(list)) {
    Object.keys(list).forEach(function(key) {
      iterator.call(context, list[key], key);
    });

    return list;
  }

  list.forEach.call(list, iterator, context);

  return list;
};


_es5.map = function(list, iterator, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return list.map(iterator, context);
};


_es5.reduce = function(list, iterator, memo, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  var args = [];

  if (context) {
    args.push(iterator.bind(context));
  } else {
    args.push(iterator);
  }
  if (memo) {
    args.push(memo);
  }

  return Array.prototype.reduce.apply(list, args);
};


_es5.reduceRight = function(list, iterator, memo, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  var args = [];

  if (context) {
    args.push(iterator.bind(context));
  } else {
    args.push(iterator);
  }
  if (memo) {
    args.push(memo);
  }

  return Array.prototype.reduceRight.apply(list, args);
};


_es5.find = function(list, predicate, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  var ret;

  list.some(function(item) {
    if (predicate.call(context, item)) {
      ret = item;
      
      return true;
    }

    return false;
  });

  return ret;
};


_es5.filter = function(list, predicate, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return list.filter(predicate, context);
};


_es5.where = function(list, properties) {
  var propKeys = Object.keys(properties),
      propKeysLen = propKeys.length;

  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return list.filter(function(item) {
    return propKeys.filter(function(key) {
      return item[key] === properties[key];
    }).length === propKeysLen;
  });
};


