'use strict';

var _es5 = (function(undefined) {

  // Collection

  function each(list, iterator, context) {
    if (!Array.isArray(list)) {
      Object.keys(list).forEach(function(key) {
        iterator.call(context, list[key], key);
      });

      return list;
    }

    list.forEach.call(list, iterator, context);

    return list;
  }

  function map(list, iterator, context) {
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return list.map(iterator, context);
  }

  function reduce(list, iterator, memo, context) {
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
  }

  function reduceRight(list, iterator, memo, context) {
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
  }

  function find(list, predicate, context) {
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
  }

  function filter(list, predicate, context) {
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return list.filter(predicate, context);
  }

  function where(list, properties) {
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
  }

  function findWhere(list, properties) {
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
  }

  function reject(list, predicate, context) {
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return list.filter(function(value, i) {
      return !predicate.call(this, value, i, list);
    }, context);
  }


  function every(list, predicate, context) {
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return list.every(predicate, context);
  }

  function some(list, predicate, context) {
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return list.some(predicate, context);
  }

  function contains(list, value) {
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return !!~list.indexOf(value);
  }

  function invoke(list, methodName) {
    var args = Array.prototype.slice.call(arguments, 2);

    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return list.map(function(item) {
      return item[methodName].apply(item, args);
    });
  }

  function pluck(list, propertyName) {
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return list.map(function(item) {
      return item[propertyName];
    });
  }

  function max(list, iterator, context) {
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
  }

  function min(list, iterator, context) {
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
  }

  function sortBy(list, iterator, context) {
    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return list.map(function(item) {
      return {
        value: item,
        compare: iterator.call(context, item)
      };
    }).sort(function(a, b) {
      return a.compare > b.compare;
    }).map(function(item) {
      return item.value;
    });
  }

  function groupBy(list, iterator, context) {
    var ret = {},
        prop = typeof iterator === 'string';

    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    list.forEach(function(item) {
      var key = prop ? item[iterator] : iterator.call(context, item);

      if (!ret[key]) {
        ret[key] = [];
      }
      ret[key].push(item);
    });

    return ret;
  }

  function indexBy(list, iterator, context) {
    var ret = {},
        prop = typeof iterator === 'string';

    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    list.forEach(function(item) {
      ret[prop ? item[iterator] : iterator.call(context, item)] = (item);
    });

    return ret;
  }

  function countBy(list, iterator, context) {
    var ret = {};

    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    list.forEach(function(item) {
      var key = iterator.call(context, item);

      if (!ret[key]) {
        ret[key] = 1;
      } else {
        ret[key] += 1;
      }
    });

    return ret;
  }

  function shuffle(list) {
    var ret = [];

    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    list.forEach(function(item, i) {
      var rand = Math.floor(Math.random() * (i + 1));

      ret[i] = ret[rand];
      ret[rand] = item;
    });

    return ret;
  }

  function sample(list, n) {
    var ret = [];

    if (!Array.isArray(list)) {
      list = Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    list.forEach(function(item, i) {
      var rand = Math.floor(Math.random() * (i + 1));

      ret[i] = ret[rand];
      ret[rand] = item;
    });

    return n ? ret.slice(0, n) : ret[0];
  }

  function toArray(list) {
    if (!Array.isArray(list)) {
      return Object.keys(list).map(function(key) {
        return list[key];
      });
    }

    return Array.prototype.slice.call(list);
  }

  function size(list) {
    if (!Array.isArray(list)) {
      list = Object.keys(list);
    }

    return list.length;
  }

  return {
    each: each,
    map: map,
    reduce: reduce,
    reduceRight: reduceRight,
    find: find,
    filter: filter,
    where: where,
    findWhere: findWhere,
    reject: reject,
    every: every,
    some: some,
    contains: contains,
    invoke: invoke,
    pluck: pluck,
    max: max,
    min: min,
    sortBy: sortBy,
    groupBy: groupBy,
    indexBy: indexBy,
    countBy: countBy,
    shuffle: shuffle,
    sample: sample,
    toArray: toArray,
    size: size
  };
})(void 0);