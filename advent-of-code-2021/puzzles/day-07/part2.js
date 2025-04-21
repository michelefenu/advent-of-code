const crabUtils = require('../../modules/crab-utils');

function solve(input) {
  return crabUtils.calculateFuelImproved(input[0]);
}

module.exports = { solve }