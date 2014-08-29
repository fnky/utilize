'use strict';

var util = require('util');

/**
 * Recomposes a object of string with dot notation
 * @param  {string} str Dot notoated string (e.g. foo.bar.baz)
 * @return {any} The value of the recomposed object
 */
Object.prototype.recompose = function(str) {
  var i = 0, obj = this;
  str = str.split('.');
  while(i < str.length) {
    obj = obj[str[i]];
    ++i;
  }
  return obj;
};

/**
 * Format string with object or array
 * @param  {object|array} o An object or array of keys/values
 * @return {string} Formatted string
 */
String.prototype.f  = function(o) {
  return this.replace(/{([^{}]*)}/g,
    function(a, b) {
      var r = o[b];
      if(typeof r === 'string' || typeof r === 'number') {
        return r;
      } else if (typeof o === 'object') {
        var p = o.recompose(b);
        if(typeof p === 'function') {
          return p.call(o);
        } else {
          return p;
        }
      }
      else { return a; }
    });
};

/**
 * Prints string with `util.print`
 */
Object.prototype.p = function() {
  return util.print(this);
};

/**
 * Prints line of string with `util.print`
 */
Object.prototype.pl = function() {
  return util.print(this);
};
