const memoryUtils = require('../../modules/memory-utils')

function solve(input) {
  const startingNumbers = input[0].split(',').map(x => parseInt(x))
  return memoryUtils.getNumber(startingNumbers, 2020)
}

module.exports = { solve }
