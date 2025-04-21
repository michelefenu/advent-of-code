const diagnosticUtils = require('../../modules/diagnostic-utils');

function solve(input) {
  const {gammaRate, epsilonRate} = diagnosticUtils.getSubmarineData(input);

  return parseInt(gammaRate, 2) * parseInt(epsilonRate, 2)
}

module.exports = { solve }