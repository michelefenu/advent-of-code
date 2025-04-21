const sevenSegmentsUtils = require('../../modules/seven-segments-utils');

function solve(input) {
  return sevenSegmentsUtils.getUniqueOutputValues(input);
}

module.exports = { solve }