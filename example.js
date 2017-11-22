const { intlToMongo } = require('./index')

const intlOpts = {
  sensitivity: 'base',
  ignorePunctuation: true,
  numeric: true,
  caseFirst: 'upper'
}

console.log('Intl', intlOpts)
console.log('Mongo', intlToMongo(intlOpts))
