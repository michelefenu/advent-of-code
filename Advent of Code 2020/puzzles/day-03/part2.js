const slopeUtils = require('../../modules/slope-utils')

function solve(input) {
  const slopeMap = input.map(x => x.split(''))
  const tobogganSlopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ]
  let multipliedNumberOfTrees = 1

  for (let tobogganSlope of tobogganSlopes) {
    multipliedNumberOfTrees *= slopeUtils.countTrees(slopeMap, ...tobogganSlope)
  }

  return multipliedNumberOfTrees
}

module.exports = { solve }
