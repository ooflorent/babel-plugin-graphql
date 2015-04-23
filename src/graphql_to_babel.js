import dropRightWhile from 'lodash/array/dropRightWhile'
import {types as t} from 'babel-core'

const pack = (arr) => dropRightWhile(arr, (x) => x === null)

const ql = (type, ...args) => t.newExpression(
  t.memberExpression(t.identifier('GraphQL'), t.identifier(type)),
  args
)

export const Query = {
  exit(node) {
    const args = pack([
      node.arguments ? t.arrayExpression(node.arguments) : null,
      node.fields ? t.arrayExpression(node.fields) : null,
      node.fragments ? t.arrayExpression(node.fragments) : null,
    ])

    return ql('Query', t.literal(node.name), ...args)
  },
}

export const Fragment = {
  exit(node) {
    const args = pack([
      node.fields ? t.arrayExpression(node.fields) : null,
      node.fragments ? t.arrayExpression(node.fragments) : null,
    ])

    return ql('Fragment', t.literal(node.name), ...args)
  },
}

export const Field = {
  exit(node) {
    const args = pack([
      node.fields ? t.arrayExpression(node.fields) : null,
      node.fragments ? t.arrayExpression(node.fragments) : null,
      node.calls ? t.arrayExpression(node.calls) : null,
    ])

    return ql('Field', t.literal(node.name), ...args)
  },
}

export const Call = {
  exit(node) {
    return ql('Call', t.literal(node.callee), t.arrayExpression(node.arguments))
  },
}

export const Identifier = {
  enter(node, state) {
    return t.memberExpression(t.identifier('params'), t.identifier(node.name))
  },
}

export const Reference = {
  enter(node, state) {
    return state.arguments[node.index]
  },
}

export const Literal = {
  enter(node) {
    return t.valueToNode(node.value)
  },
}
