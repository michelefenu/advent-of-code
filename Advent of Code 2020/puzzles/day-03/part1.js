const slopeUtils = require('../../modules/slope-utils')

function solve(input) {
  const slopeMap = input.map(x => x.split(''))

  const dRight = 3
  const dDown = 1

  const numberOfTrees = slopeUtils.countTrees(slopeMap, dRight, dDown)

  return numberOfTrees
}

module.exports = { solve }
