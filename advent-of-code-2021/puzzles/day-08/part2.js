const sevenSegmentsUtils = require('../../modules/seven-segments-utils');

function solve(input) {
  return sevenSegmentsUtils.getLedPositions(input);
}

module.exports = { solve }