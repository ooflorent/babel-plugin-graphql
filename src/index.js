import { parse, traverse } from 'graphql-parser'

export const name = 'graphql.templateLiterals'

export default function build(babel) {
  const { types: t, Transformer } = babel

  class GraphQLVisitor {
    constructor(refs) {
      this.refs = refs
    }

    Query(node) {
      const props = []
      const query = t.objectExpression(props)

      if (node.fields.length > 0) {
        for (let i = 0; i < node.fields.length; i++) {
          const field = node.fields[i]
          if (t.isCallExpression(field)) {
            node.fields[i] = t.spreadProperty(t.memberExpression(field, t.identifier('fields')))
          }
        }

        props.push(t.property('init', t.identifier('fields'), t.objectExpression(node.fields)))
      }

      return query
    }

    Field(node) {
      const props = []

      if (node.alias) {
        props.push(t.property('init', t.identifier('alias'), t.valueToNode(node.alias)))
      }

      if (node.params.length > 0) {
        props.push(t.property('init', t.identifier('params'), t.objectExpression(node.params)))
      }

      if (node.fields.length > 0) {

        props.push(t.property('init', t.identifier('fields'), t.objectExpression(node.fields)))
      }

      return t.property('init', t.identifier(node.name), t.objectExpression(props))
    }

    Argument(node) {
      return t.property('init', t.identifier(node.name), node.value)
    }

    Literal(node) {
      return t.valueToNode(node.value)
    }

    Variable(node) {
      return t.memberExpression(t.identifier('params'), t.identifier(node.name))
    }

    Reference(node) {
      return this.refs[node.name]
    }
  }

  function compile(node) {
    let source = ''
    for (let i = 0; i < node.quasis.length; i++) {
      if (i > 0) source += '&' + (i - 1)
      source += node.quasis[i].value.raw
    }

    return t.functionExpression(null, [t.identifier('params')], t.blockStatement([
      t.returnStatement(traverse(parse(source), new GraphQLVisitor(node.expressions))),
    ]))
  }

  return new Transformer(name, {
    TaggedTemplateExpression: {
      enter(node) {
        if (t.isIdentifier(node.tag, {name: 'graphql'})) {
          return compile(node.quasi)
        }
      }
    }
  })
}
