const niceStrings = require('../../modules/nice-strings')

function solve(input) {
  const filteredStrings = input.filter(x => niceStrings.isVeryNiceString(x));

  return filteredStrings.length;
}

module.exports = { solve }