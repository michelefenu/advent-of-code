const lightfishUtils = require('../../modules/lightfish-utils');

function solve(input) {
  return lightfishUtils.simulate(input[0], 80);
}

module.exports = { solve }