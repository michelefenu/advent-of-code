const luggageUtils = require('../../modules/luggage-utils')

function solve(input) {
  const luggagesMap = luggageUtils.getLuggagesMap(input)
  const containedBags = luggageUtils.getNumberOfContainedBags(luggagesMap, 'shiny gold')
  
  return containedBags
}

module.exports = { solve }
