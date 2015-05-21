import Plugin, { name as PLUGIN_NAME } from '../src'
import assert from 'assert'
import fs from 'fs'
import { transform } from 'babel'

function readFile(filename) {
  return fs.readFileSync(`${ __dirname }/fixtures/${ filename }`, 'utf8')
}

function run(testName) {
  const actualCode = readFile(`${ testName }/actual.js`)
  const expectedCode = readFile(`${ testName }/expected.js`)

  it(`compiles ${ testName }`, () => {
    const result = transform(actualCode, { stage: 0, plugins: [Plugin] })
    assert.equal(result.code.trim(), expectedCode)
  })
}

describe(PLUGIN_NAME, () => {
  run('fields')
  run('literals')
  run('variables')
  run('references')
  run('fragments')
})
