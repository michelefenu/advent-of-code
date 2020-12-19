const satelliteUtils = require('../../modules/satellite-utils')

function solve(input) {
  input = input.map(x => x ? x : '###')
  const rulesString = input.slice(0, input.indexOf('###'))
  const messages = input.slice(input.indexOf('###') + 1)
  
  const rule = satelliteUtils.buildRule(rulesString)

  const validMessages = messages.filter(x => satelliteUtils.isMessageValid(x, rule)).length

  return validMessages
}

module.exports = { solve }
