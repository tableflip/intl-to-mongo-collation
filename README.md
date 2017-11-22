# intl-to-mongo-collation

[Intl.Collator] options are similar to the [MongoDB collation] options, so let's automate the conversion.

The tests demonstrate:

```js
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
```

With this, it's possible to define the browser Intl.Collator sort options once, and re-use them for the server side mongo collation opts.

**The conversion is best effort**. You need to evaluate if it works for your i18n needs.

PRs to make the conversion more accurate are welcome!

---

A [(╯°□°）╯︵TABLEFLIP](https://tableflip.io) side project.

[Intl.Collator]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Collator
[MongoDB collation]: https://docs.mongodb.com/manual/reference/collation/
