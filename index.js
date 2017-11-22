/*
 * Translate Intl.collation opts into mongodb collation opts.
 *
 * See: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
 * See: https://docs.mongodb.com/manual/reference/collation/
 */

// `usage` is probably detected from usage in mongo.
// `localMatcher` isn't a thing in mongo
const intlKeyMap = {
  sensitivity: {
    mongoKey: 'strength',
    mapValue: function (str) {
      const map = {
        // Only strings that differ in base letters compare as unequal. Examples: a ≠ b, a = á, a = A.
        'base': 1,
        // Only strings that differ in base letters or accents and other diacritic marks compare as unequal. Examples: a ≠ b, a ≠ á, a = A.
        'accent': 2,
        // Only strings that differ in base letters or case compare as unequal. Examples: a ≠ b, a = á, a ≠ A.
        'case': 3,
        // Strings that differ in base letters, accents and other diacritic marks, or case compare as unequal. Other differences may also be taken into consideration. Examples: a ≠ b, a ≠ á, a ≠ A.
        'variant': 4
        // N.B, mongo allows strength 5, but there is no equivalent in intl.
      }
      return map[str]
    }
  },
  ignorePunctuation: {
    mongoKey: 'alternate',
    mapValue: function (bool) { return bool ? 'shifted' : 'non-ignorable' }
  },
  numeric: {
    mongoKey: 'numericOrdering',
    mapValue: function (bool) { return bool }
  },
  caseFirst: {
    mongoKey: 'caseFirst',
    mapValue: function (str) { return !str || str === 'false' ? 'off' : str }
  }
}

const intlToMongo = function (intlOpts, locale) {
  const mongoOpts = Object.keys(intlKeyMap).reduce(function (mongoOpts, intlKey) {
    if (!intlOpts.hasOwnProperty(intlKey)) return mongoOpts
    const intlValue = intlOpts[intlKey]
    const { mongoKey, mapValue } = intlKeyMap[intlKey]
    mongoOpts[mongoKey] = mapValue(intlValue)
    return mongoOpts
  }, {})

  if (locale) {
    mongoOpts.locale = locale
  }

  return mongoOpts
}

exports.intlToMongo = intlToMongo
