const cubeUtils = require('../../modules/cube-utils')

function solve(input) {

 return cubeUtils.getActiveCubes(input, 6)
}

module.exports = { solve }
