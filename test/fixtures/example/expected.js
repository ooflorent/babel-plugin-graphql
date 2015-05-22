"use strict";

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var IMAGE_WIDTH = 80;
var IMAGE_HEIGHT = 80;

var PostFragment = function PostFragment(params) {
  return {
    fields: {
      post: {
        fields: {
          title: {},
          published_at: {}
        }
      }
    }
  };
};

var UserQuery = function UserQuery(params) {
  return {
    fields: {
      user: {
        params: {
          id: params.id
        },
        fields: {
          nickname: {},
          avatar: {
            params: {
              width: IMAGE_WIDTH,
              height: IMAGE_HEIGHT
            },
            fields: {
              url: {}
            }
          },
          posts: {
            params: {
              first: params.count
            },
            fields: {
              count: {},
              edges: {
                fields: {
                  node: {
                    fields: _extends({}, PostFragment().fields)
                  }
                }
              }
            }
          }
        }
      }
    }
  };
};