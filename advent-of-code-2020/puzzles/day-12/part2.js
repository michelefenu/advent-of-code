const navigationUtils = require('../../modules/navigation-utils')

function solve(input) {
 return navigationUtils.getManhattanDistanceNewInstructions(input)
}

module.exports = { solve }
