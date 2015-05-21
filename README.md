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

## Example

The plugin will compile the following code:

```js
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
```

[graphql-parser-gh]: https://github.com/ooflorent/graphql-parser/issues
