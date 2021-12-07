const crabUtils = require('../../modules/crab-utils');

function solve(input) {
  return crabUtils.calculateFuel(input[0]);
}

module.exports = { solve }