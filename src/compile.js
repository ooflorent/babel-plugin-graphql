import {types as t} from 'babel-core'
import {concat, parse, Transformer} from 'graphql-parser'
import * as GraphQLToBabel from './graphql_to_babel'

const transformer = new Transformer(GraphQLToBabel)

export default function compile(quasi, node) {
  t.assertTemplateLiteral(node)

  const strings = node.quasis.map((child) => child.value.raw)
  const source = concat(strings)
  const ast = parse(source)

  const replacement = transformer.run(ast, {
    arguments: node.expressions,
  })

  return t.functionExpression(null, [t.identifier('params')], t.blockStatement([
    t.variableDeclaration('const', [
      t.variableDeclarator(t.identifier('GraphQL'), t.memberExpression(quasi, t.identifier('GraphQL'))),
    ]),
    t.returnStatement(replacement),
  ]))
}
