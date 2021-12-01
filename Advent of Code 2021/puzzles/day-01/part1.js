const sonarUtils = require('../../modules/sonar-utils')

function solve(input) {
  return sonarUtils.countIncreased(input.map(Number));
}

module.exports = { solve }