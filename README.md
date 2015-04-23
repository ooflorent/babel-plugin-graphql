# babel-plugin-graphql

> Babel plugin that compile GraphQL tagged template strings.

_Issues related to GraphQL parsing should be reporter on `graphql-parser` [issue-tracker][graphql-parser-gh]_

## Install

```sh
npm install --save-dev babel-plugin-graphql
```

You also need the GraphQL type definitions (or any other compatible implementation):

```sh
npm install --save graphql-types
```

## Usage

Run:

```sh
babel --plugins graphql script.js
```

Or add the plugin to your `.babelrc` configuration:

```json
{
  "plugins": [ "graphql:pre" ]
}
```

## Example

The plugin will compile the following code:

```js
const PostFragment = graphql`
  post {
    title,
    published_at,
  }
`
const UserQuery = graphql`
  user(<id>) {
    nickname,
    avatar.resize(${IMAGE_WIDTH}, ${IMAGE_HEIGHT}) {
      url
    },
    posts.first(<count>) {
      count,
      edges {
        node {
          ${ PostFragment() }
        }
      }
    }
  }
`
```

into:

```js
var PostFragment = function PostFragment(params) {
  return new GraphQL.Fragment("post", [new GraphQL.Field("title"), new GraphQL.Field("published_at")]);
};
var UserQuery = function UserQuery(params) {
  return new GraphQL.Query("user", [params.id], [new GraphQL.Field("nickname"), new GraphQL.Field("avatar", [new GraphQL.Field("url")], [new GraphQL.Call("resize", [IMAGE_WIDTH, IMAGE_HEIGHT])]), new GraphQL.Field("posts", [new GraphQL.Field("count"), new GraphQL.Field("edges", [new GraphQL.Field("node", [PostFragment()])])], [new GraphQL.Call("first", [params.count])])]);
};
```

[graphql-parser-gh]: https://github.com/ooflorent/graphql-parser
