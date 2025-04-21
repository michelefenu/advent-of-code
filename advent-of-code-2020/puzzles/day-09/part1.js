const xmasUtils = require('../../modules/xmas-utils')

function solve(input) {
  return xmasUtils.validateTransmission(input, 25).errors[0]
}

module.exports = { solve }
