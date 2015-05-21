"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fragmentA = function fragmentA(params) {
  return {
    fields: {
      a: {},
      b: {}
    }
  };
};
var fragmentB = function fragmentB(params) {
  return {
    fields: {
      c: {},
      d: {}
    }
  };
};
var query = function query(params) {
  return {
    fields: _extends({}, fragmentA().fields, fragmentB().fields, {
      e: {},
      f: {}
    })
  };
};