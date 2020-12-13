const autobusUtils = require('../../modules/autobus-utils')

function solve(input) {
  const busIds = input[1].split(',').map(x => x!== 'x' ? parseInt(x) : x)

 return autobusUtils.solveContest(busIds)
}

module.exports = { solve }
