const xmasUtils = require('../../modules/xmas-utils')

function solve(input) {
  const invalidDigit =  xmasUtils.validateTransmission(input, 5).errors[0]
  return xmasUtils.breakCypher(input, invalidDigit)
}

module.exports = { solve }
