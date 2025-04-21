const niceStrings = require('../../modules/nice-strings')

function solve(input) {
  const filteredStrings = input.filter(x => niceStrings.isNiceString(x));

  return filteredStrings.length;
}

module.exports = { solve }