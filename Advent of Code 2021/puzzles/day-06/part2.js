const lightfishUtils = require('../../modules/lightfish-utils');

function solve(input) {
  return lightfishUtils.estimate(input[0], 256);
}

module.exports = { solve }