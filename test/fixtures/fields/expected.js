"use strict";

var query = function query(params) {
  return {
    fields: {
      a: {},
      b: {
        fields: {
          c: {},
          d: {
            fields: {
              e: {}
            }
          },
          f: {},
          g: {}
        }
      }
    }
  };
};