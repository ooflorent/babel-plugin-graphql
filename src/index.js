import {Transformer, types as t} from 'babel-core'
import compile from './compile'

export default new Transformer('graphql', {
  TaggedTemplateExpression(node) {
    const {tag, quasi} = node
    if (t.isIdentifier(tag, {name: 'graphql'})) {
      return compile(quasi)
    }

    return node
  },
})
