import { parse, traverse } from 'graphql-parser'

export default function build(babel) {
  const { types: t } = babel
  class GraphQLVisitor {
    constructor(refs) {
      this.refs = refs
    }

    Query(node) {
      const props = []
      const query = t.objectExpression(props)

      if (node.fields.length > 0) {
        props.push(compileFields(node.fields))
      }

      return query
    }

    Field(node) {
      const props = []

      if (node.alias) {
        props.push(t.objectProperty(t.identifier('alias'), t.valueToNode(node.alias)))
      }

      if (node.params.length > 0) {
        props.push(t.objectProperty(t.identifier('params'), t.objectExpression(node.params)))
      }

      if (node.fields.length > 0) {
        props.push(compileFields(node.fields))
      }

      return t.objectProperty(t.identifier(node.name), t.objectExpression(props))
    }

    Argument(node) {
      return t.objectProperty(t.identifier(node.name), node.value)
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

  function compileFields(fields) {
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i]
      if (t.isCallExpression(field)) {
        fields[i] = t.spreadProperty(t.memberExpression(field, t.identifier('fields')))
      }
    }

    return t.objectProperty(t.identifier('fields'), t.objectExpression(fields))
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

  return {
    visitor: {
      TaggedTemplateExpression: {
        enter(path) {
          const { node } = path
          if (t.isIdentifier(node.tag, {name: 'graphql'})) {
            return path.replaceWith(compile(node.quasi))
          }
        },
      },
    },
  }
}
