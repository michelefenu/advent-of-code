const lightsUtils = require('../../modules/lights-utils')

function solve(input) {
  return lightsUtils.manageLights(input)
}

module.exports = { solve }