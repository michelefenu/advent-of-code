const satelliteUtils = require('../../modules/satellite-utils')

function solve(input) {
  input = input.map(x => x ? x : '###')
  const rulesString = input.slice(0, input.indexOf('###'))

  // Replace input
  rulesString[rulesString.indexOf('8: 42')] = '8: 42 | 42 8'
  rulesString[rulesString.indexOf('11: 42 31')] = '11: 42 31 | 42 11 31'

  const messages = input.slice(input.indexOf('###') + 1)
  
  const rule = satelliteUtils.buildRule(rulesString)

  const validMessages = messages.filter(x => satelliteUtils.isMessageValid(x, rule)).length

  return validMessages
}

module.exports = { solve }
