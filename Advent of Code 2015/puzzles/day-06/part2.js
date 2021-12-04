const lightsUtils = require('../../modules/lights-utils')

function solve(input) {
  return lightsUtils.manageBrightness(input)
}

module.exports = { solve }