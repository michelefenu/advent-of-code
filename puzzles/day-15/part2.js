const memoryUtils = require('../../modules/memory-utils')

function solve(input) {
  const startingNumbers = input[0].split(',').map(x => parseInt(x))
  return memoryUtils.getNumberImproved(startingNumbers, 30000000)
}

module.exports = { solve }
