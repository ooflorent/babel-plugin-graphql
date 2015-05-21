"use strict";

var query = function query(params) {
  return {
    fields: {
      a: {
        params: {
          b: params._0
        },
        fields: {
          d: {
            params: {
              e: params._1,
              g: params._2
            }
          }
        }
      }
    }
  };
};