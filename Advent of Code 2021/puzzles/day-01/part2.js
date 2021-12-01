const sonarUtils = require('../../modules/sonar-utils')

function solve(input) {
  return sonarUtils.countSlidingIncreased(input.map(Number));
}

module.exports = { solve }