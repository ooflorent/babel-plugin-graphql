"use strict";

var ref = "bar";
var query = function query(params) {
  return {
    fields: {
      a: {
        params: {
          b: 0,
          c: "foo",
          d: ref
        }
      }
    }
  };
};