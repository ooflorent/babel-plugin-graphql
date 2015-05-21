"use strict";

var query = function query(params) {
  return {
    fields: {
      a: {
        params: {
          b: 12,
          c: null,
          d: true,
          e: "f"
        }
      }
    }
  };
};