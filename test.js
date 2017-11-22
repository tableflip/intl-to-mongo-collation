const test = require('ava')
const { intlToMongo } = require('./index')

test('converts intl collation opts to mongo collation opts', t => {
  const intlOpts = {
    sensitivity: 'base',
    ignorePunctuation: true,
    numeric: true,
    caseFirst: 'upper'
  }
  const mongoOpts = {
    strength: 1,
    alternate: 'shifted',
    numericOrdering: true,
    caseFirst: 'upper'
  }
  const actual = intlToMongo(intlOpts)
  t.deepEqual(actual, mongoOpts)
})

test('adds locale if provided', t => {
  const intlOpts = {
    sensitivity: 'variant'
  }
  const mongoOpts = {
    strength: 4,
    locale: 'my'
  }
  const actual = intlToMongo(intlOpts, 'my')
  t.deepEqual(actual, mongoOpts)
})

test('converts caseFirst `false` to `off`', t => {
  const intlOpts = {
    sensitivity: 'accent',
    caseFirst: 'false'
  }
  const mongoOpts = {
    strength: 2,
    caseFirst: 'off'
  }
  const actual = intlToMongo(intlOpts)
  t.deepEqual(actual, mongoOpts, `Handles string 'false'`)
})

test('converts caseFirst falsey to `off`', t => {
  const intlOpts = {
    sensitivity: 'accent',
    caseFirst: false
  }
  const mongoOpts = {
    strength: 2,
    caseFirst: 'off'
  }
  const actual = intlToMongo(intlOpts)
  t.deepEqual(actual, mongoOpts, `Handles falsy 'false'`)
})
