import Plugin from '../src'
import assert from 'assert'
import fs from 'fs'
import { transform } from 'babel'

const opts = {
  optional: [ 'es7.objectRestSpread' ],
  plugins:  [ Plugin ],
}

function readFile(filename) {
  return fs.readFileSync(`${ __dirname }/fixtures/${ filename }`, 'utf8')
}

function run(testName) {
  const actualCode = readFile(`${ testName }/actual.js`)
  const expectedCode = readFile(`${ testName }/expected.js`)

  it(`compiles ${ testName }`, () => {
    const result = transform(actualCode, opts)
    assert.equal(result.code.trim(), expectedCode)
  })
}

describe('graphql', () => {
  // Spec
  run('fields')
  run('literals')
  run('variables')
  run('references')
  run('fragments')

  // Mics
  run('example')
})
