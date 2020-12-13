const autobusUtils = require('../../modules/autobus-utils')

function solve(input) {
  const timestamp = parseInt(input[0])
  const busIds = input[1].split(',').filter(x => x !== 'x').map(x => parseInt(x))

 return autobusUtils.getEarliestBus(busIds, timestamp)
}

module.exports = { solve }
