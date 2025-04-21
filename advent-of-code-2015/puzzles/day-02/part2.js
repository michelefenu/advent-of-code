const boxUtils = require('../../modules/box-utils')

function solve(input) {
  const totalRibbonLength = input.reduce((a, b) =>  boxUtils.getRibbonLength(b) + a, 0);
  return totalRibbonLength;
}

module.exports = { solve }