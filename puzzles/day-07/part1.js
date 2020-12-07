const luggageUtils = require('../../modules/luggage-utils')

function solve(input) {
  const luggagesMap = luggageUtils.getLuggagesMap(input)
  const wrappingBags = luggageUtils.findWrappingBag(luggagesMap, 'shiny gold')
  
  return wrappingBags.filter(x => x.valid).length - 1
}

module.exports = { solve }
