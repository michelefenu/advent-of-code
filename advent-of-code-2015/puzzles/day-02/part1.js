const boxUtils = require('../../modules/box-utils')

function solve(input) {
  const totalWrappingPaper = input.reduce((a, b) =>  boxUtils.getBoxPaperQty(b) + a, 0);
  return totalWrappingPaper;
}

module.exports = { solve }