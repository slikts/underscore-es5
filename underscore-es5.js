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
  var args = [];

  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

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


_es5.findWhere = function(list, properties) {
  var propKeys = Object.keys(properties),
      propKeysLen = propKeys.length;

  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  var ret;

  list.some(function(item) {
    if (propKeys.filter(function(key) {
      return item[key] === properties[key];
    }).length === propKeysLen) {
      ret = item;

      return true;
    }

    return false;
  });

  return ret;
};


_es5.reject = function(list, predicate, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return list.filter(function(value, i) {
    return !predicate.call(this, value, i, list);
  }, context);
};


_es5.every = function(list, predicate, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return list.every(predicate, context);
};


_es5.some = function(list, predicate, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return list.some(predicate, context);
};


_es5.contains = function(list, value) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return !!~list.indexOf(value);
};


_es5.invoke = function(list, methodName) {
  var args = Array.prototype.slice.call(arguments, 2);

  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return list.map(function(item) {
    return item[methodName].apply(item, args);
  });
};


_es5.pluck = function(list, propertyName) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  return list.map(function(item) {
    return item[propertyName];
  });
};


_es5.max = function(list, iterator, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  if (!iterator) {
    return Math.max.apply(undefined, list.filter(function(item) {
      return !Number.isNaN(+item);
    }));
  }
  
  return list.reduce(function(a, b) {
    return iterator.call(context, a) > iterator.call(context, b) ? a : b;
  });
};


_es5.min = function(list, iterator, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

  if (!iterator) {
    return Math.min.apply(undefined, list.filter(function(item) {
      return !Number.isNaN(+item);
    }));
  }

  return list.reduce(function(a, b) {
    return iterator.call(context, a) < iterator.call(context, b) ? a : b;
  });
};


_es5.sortBy = function(list, iterator, context) {
  if (!Array.isArray(list)) {
    list = Object.keys(list).map(function(key) {
      return list[key];
    });
  }

};
