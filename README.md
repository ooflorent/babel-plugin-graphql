# babel-plugin-graphql

> Babel plugin that compile GraphQL tagged template strings.

_Issues related to GraphQL parsing should be reporter on `graphql-parser` [issue-tracker][graphql-parser-gh]._

## Install

```sh
npm install --save-dev babel-plugin-graphql
```

## Usage

Run:

```sh
babel --plugins graphql.templateLiterals script.js
```

Or add the plugin to your `.babelrc` configuration:

```json
{
  "plugins": [ "graphql.templateLiterals" ]
}
```

__Note:__ Due to current API limitations you need to enable `es7.objectRestSpread` transformer or _stage 1_ transformers.

## Example

The plugin will compile the following code:

```js
const IMAGE_WIDTH = 80
const IMAGE_HEIGHT = 80

const PostFragment = graphql`
  {
    post {
      title,
      published_at
    }
  }
`

const UserQuery = graphql`
  {
    user(id: <id>) {
      nickname,
      avatar(width: ${IMAGE_WIDTH}, height: ${IMAGE_HEIGHT}) {
        url
      },
      posts(first: <count>) {
        count,
        edges {
          node {
            ${ PostFragment() }
          }
        }
      }
    }
  }
`
```

into:

```js
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
```

[graphql-parser-gh]: https://github.com/ooflorent/graphql-parser/issues
